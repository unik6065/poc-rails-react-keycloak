class ApplicationController < ActionController::Base
  before_action :validate_token

  private

  def validate_token
    # validate token presence
    token = request.headers['Authorization']&.split(' ')&.last
    return render json: { error: 'Unauthorized' }, status: :unauthorized unless token

    logger.debug "pass token validation, token : #{token}"

    # Execute JWKS request and get back public key
    jwks_url = 'http://localhost:8080/realms/SecondRealm/protocol/openid-connect/certs'
    jwk_response = Net::HTTP.get(URI(jwks_url))
    jwks = JSON.parse(jwk_response)

    # Extract the 'kid' token
    logger.debug "list of kid : #{JWT.decode(token, nil, false)}"
    kid = JWT.decode(token, nil, false)[1]['kid']

    # Find the corresponding public key within the JWKS

    logger.debug "kid : #{kid}"
    logger.debug "jwks: #{jwks}"
    matching_key = jwks['keys'].find { |key| key['kid'] == kid }

    # validate the token's signature
    logger.debug "matching_key : #{matching_key}"
    jwt_algorithm = matching_key['alg']

    # generate the public key
    public_key = create_rsa_key(matching_key['n'], matching_key['e'])

    logger.debug "public key : #{public_key}"

    # decode the token
    decoded_token = JWT.decode(token, public_key, true, algorithm: jwt_algorithm)
    return render json: { error: 'Unauthorized' }, status: :unauthorized unless decoded_token
    logger.debug 'token succesfully verified'
    logger.debug "token values : #{decoded_token}"
  end

  def create_rsa_key(n, e)
    data_sequence = OpenSSL::ASN1::Sequence([
                                              OpenSSL::ASN1::Integer(base64_to_long(n)),
                                              OpenSSL::ASN1::Integer(base64_to_long(e))
                                            ])
    asn1 = OpenSSL::ASN1::Sequence(data_sequence)
    OpenSSL::PKey::RSA.new(asn1.to_der)
  end

  def base64_to_long(data)
    decoded_with_padding = Base64.urlsafe_decode64(data) + Base64.decode64("==")
    decoded_with_padding.to_s.unpack("C*").map do |byte|
      byte_to_hex(byte)
    end.join.to_i(16)
  end

  def byte_to_hex(int)
    int < 16 ? "0" + int.to_s(16) : int.to_s(16)
  end
end
