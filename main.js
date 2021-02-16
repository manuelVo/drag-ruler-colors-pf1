Hooks.once("dragRuler.ready", (SpeedProvider) => {
    class Pf1SpeedProvider extends SpeedProvider {
        get colors() {
            return [
                {id: "walk", default: 0x00FF00},
                {id: "dash", default: 0xFFFF00},
                {id: "run", default: 0xFF8000}
            ]
        }

        getRanges(token) {
            const baseSpeed = token.actor.data.data.attributes.speed.land.total

            // Search through items for pieces of heavy armor that is equipped
            const heavyArmor = token.actor.items.find(item =>
                   item.data.type === "equipment"
                && item.data.data.equipmentType === "armor"
                && item.data.data.equipped
                && item.data.data.equipmentSubtype === "heavyArmor"
            )

            // If the actor is wearing heavy armor the run mutiplier is 3, otherwise 4
            let runMultiplier;
            if (heavyArmor)
                runMultiplier = 3;
            else
                runMultiplier = 4;

            return [
                {range: baseSpeed, color: "walk"},
                {range: baseSpeed * 2, color: "dash"},
                {range: baseSpeed * runMultiplier, color: "run"},
            ]
        }
    }

    dragRuler.registerModule("drag-ruler-colors-pf1", Pf1SpeedProvider)
})
