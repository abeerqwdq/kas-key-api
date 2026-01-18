local HttpService = game:GetService("HttpService")
local RbxAnalytics = game:GetService("RbxAnalyticsService")

-- USER KEY
local key = getgenv().KEY or "NO_KEY"

-- HWID
local hwid = RbxAnalytics:GetClientId()

-- AUTH SERVER
local url = "https://kas-key-api.vercel.app/api/check?key="
    .. key .. "&hwid=" .. hwid

local ok, res = pcall(function()
    return game:HttpGet(url)
end)

if not ok then
    game.Players.LocalPlayer:Kick("Auth server not responding")
    return
end

local data = HttpService:JSONDecode(res)

if not data.ok then
    game.Players.LocalPlayer:Kick("Invalid key or HWID")
    return
end

warn("AUTH OK — LOADING HUB")

-- ✅ YOUR HUB SCRIPT (FROM kathub REPO)
local hubUrl = "https://raw.githubusercontent.com/abeerqwdq/kathub/refs/heads/main/apv1"

local ok2, hubCode = pcall(function()
    return game:HttpGet(hubUrl)
end)

if not ok2 then
    game.Players.LocalPlayer:Kick("Failed to download hub")
    return
end

loadstring(hubCode)()
