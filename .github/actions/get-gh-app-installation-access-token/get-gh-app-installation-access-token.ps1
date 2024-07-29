param (
    [Parameter(Mandatory = $True)]
    [string]$GH_App_JWT,

    [Parameter(Mandatory = $True)]
    [string]$GH_App_Installation_ID
)

try {
    $Header = @{
        'Accept'        = 'application/vnd.github+json'
        'Authorization' = "Bearer $GH_App_JWT"
    }

    # Token expires after 1 hour
    # https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-github-apps#authenticating-as-an-installation
    $AccessTokens = Invoke-RestMethod -Method POST -Uri https://api.github.com/app/installations/$GH_App_Installation_ID/access_tokens -Header $Header -ContentType 'application/json'

    if ($? -eq $False) {
        exit $LASTEXITCODE
    }
}
catch {
    Write-Error "Exception: $_"
    exit -1
}

return $($AccessTokens.token)