param (
    [Parameter(Mandatory = $True)]
    [string]$GH_App_Private_Key,

    [Parameter(Mandatory = $True)]
    [string]$GH_App_ID,

    # Max value is 600 seconds
    # https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-github-apps#generating-a-json-web-token-jwt
    [Parameter(Mandatory = $False)]
    [int]$Expiration_Seconds = 60
)

try {
    $DateTimeEpoch = New-Object System.DateTime(1970, 1, 1, 0, 0, 0, [System.DateTimeKind]::Utc)
    $DateTimeNow = Get-Date

    # Header object containing the algorithm (RS256) used for signing
    $Header = @{
        'alg' = 'RS256'
    }

    # Payload object containing the issued at time, expiration time, and issuer
    $Payload = @{
        'iat' = [int](($DateTimeNow.ToUniversalTime() - $DateTimeEpoch).TotalSeconds);
        'exp' = [int](($DateTimeNow.ToUniversalTime() - $DateTimeEpoch).TotalSeconds) + $Expiration_Seconds;
        'iss' = $GH_App_ID;
    }

    # Convert the header and payload to base64url format
    $Header = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($(ConvertTo-Json $Header -Compress))).TrimEnd('=').Replace('+', '-').Replace('/', '_')
    $Payload = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($(ConvertTo-Json $Payload -Compress))).TrimEnd('=').Replace('+', '-').Replace('/', '_')

    # Combine the base64url header and payload with a period separator
    $UnsignedJWT = "$Header.$Payload"

    # Sign the JWT using RS256
    $RSA = New-Object System.Security.Cryptography.RSACryptoServiceProvider
    $RSA.ImportFromPem($GH_App_Private_Key)
    $Signature = $RSA.SignData([System.Text.Encoding]::UTF8.GetBytes($UnsignedJWT), [System.Security.Cryptography.HashAlgorithmName]::SHA256, [System.Security.Cryptography.RSASignaturePadding]::Pkcs1)

    # Convert the signature to a base64url string
    $Signature = [System.Convert]::ToBase64String($Signature).TrimEnd('=').Replace('+', '-').Replace('/', '_')

    # Combine the base64url header, payload, and signature with a period separator
    $JWT = "$UnsignedJWT.$Signature"
}
catch {
    Write-Error "Exception: $_"
    exit -1
}

return $JWT