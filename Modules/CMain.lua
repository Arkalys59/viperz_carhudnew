local vehSpeed = 0 
local vehGear = 0 
local vehFuel = 0 
local vehHealth = 0 

local function getGearDisplay(vehGear, vehSpeed)
    if vehGear == 0 and vehSpeed > 0 then
        return "R"
    elseif vehSpeed == 0 then
        return "N"
    else
        return vehGear
    end
end

Citizen.CreateThread(function()
    local waitTimeInVehicle = 100 
    local waitTimeOutOfVehicle = 1000 
    local msec = waitTimeOutOfVehicle

    while true do
        local ped = GetPlayerPed(-1)
        local veh = GetVehiclePedIsIn(ped, false)

        if veh ~= 0 then
            msec = waitTimeInVehicle

            vehSpeed = GetEntitySpeed(veh) * 3.6 
            vehGear = GetVehicleCurrentGear(veh)
            vehFuel = GetVehicleFuelLevel(veh)
            local engineHealth = GetVehicleEngineHealth(veh)
            vehHealth = math.max(0, (engineHealth / 1000) * 100) 

            local gearDisplay = getGearDisplay(vehGear, vehSpeed)

            SendNUIMessage({
                speed = math.ceil(vehSpeed),
                gear = gearDisplay,
                fuel = math.ceil(vehFuel),
                health = math.ceil(vehHealth),
                showUI = true
            })
        else
            msec = waitTimeOutOfVehicle

            SendNUIMessage({
                showUI = false
            })
        end

        Citizen.Wait(msec)
    end
end)