class ApplicationController < ActionController::Base
  before_action :validate_token

  private

  def doctor?
    begin
      is_doctor = @decoded_token[0]['resource_access']['localApp']['roles'].include? 'Doctor'
    rescue
      return render json: { error: 'error' }, status: :error
    end
    unauthorized unless is_doctor
  end

  def validate_token
    # validate token presence
    token = request.headers['Authorization']&.split(' ')&.last
    unauthorized unless token

    # Execute JWKS request and get back public key
    jwks_url = 'http://localhost:8080/realms/SecondRealm/protocol/openid-connect/certs'
    jwk_response = Net::HTTP.get(URI(jwks_url))
    jwks = JSON.parse(jwk_response)

    # Extract the 'kid' token
    kid = JWT.decode(token, nil, false)[1]['kid']

    # Find the corresponding public key within the JWKS
    matching_key = jwks['keys'].find { |key| key['kid'] == kid }

    # validate the token's signature
    begin
      jwt_algorithm = matching_key['alg']
    rescue NoMethodError

    end

    # generate the public key
    begin
      public_key = create_rsa_key(matching_key['n'], matching_key['e'])
    rescue NoMethodError
    end

    # decode the token
    begin
      @decoded_token = JWT.decode(token, public_key, true, algorithm: jwt_algorithm)
    rescue JWT::DecodeError
      # render json: { error: 'error' }, status: 500
    end

    unauthorized unless @decoded_token
  end

  def create_rsa_key(n, e)
    data_sequence = OpenSSL::ASN1::Sequence([
                                              OpenSSL::ASN1::Integer(base64_to_long(n)),
                                              OpenSSL::ASN1::Integer(base64_to_long(e))
                                            ])
    asn1 = OpenSSL::ASN1::Sequence(data_sequence)
    begin
      OpenSSL::PKey::RSA.new(asn1.to_der)
    rescue TypeError
      # render json: { error: 'error' }, status: 500
    end

  end

  def base64_to_long(data)
    begin
      decoded_with_padding = Base64.urlsafe_decode64(data) + Base64.decode64("==")
      decoded_with_padding.to_s.unpack("C*").map do |byte|
        byte_to_hex(byte)
      end.join.to_i(16)
    rescue NoMethodError
      # render json: { error: 'error', status: :bad_request }
    end
  end

  def byte_to_hex(int)
    int < 16 ? "0" + int.to_s(16) : int.to_s(16)
  end

  def unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
