local HttpService = game:GetService("HttpService")
local RbxAnalytics = game:GetService("RbxAnalyticsService")

-- USER KEY
local key = getgenv().KEY or "NO_KEY"

-- HWID
local hwid = RbxAnalytics:GetClientId()

local url = "https://kas-key-api.vercel.app/api/check?key="
    .. key .. "&hwid=" .. hwid

local res = game:HttpGet(url)
local data = HttpService:JSONDecode(res)

if not data.ok then
    game.Players.LocalPlayer:Kick("Auth failed")
    return
end

-- ✅ LOAD YOUR KATHUB SCRIPT
loadstring(game:HttpGet("https://raw.githubusercontent.com/abeerqwdq/kathub/refs/heads/main/apv1"))()
