Hooks.once("dragRuler.ready", () => {
	dragRuler.registerModule("drag-ruler-colors-pf1", speedProvider)
})

function speedProvider(token, playerColor) {
	const baseSpeed = token.actor.data.data.attributes.speed.land.total
    // Search through items for pieces of heavy armor that is equipped
    const heavyArmor = token.actor.items.find(item =>
           item.data.type === "equipment"
        && item.data.data.equipmentType === "armor"
        && item.data.data.equipped
        && item.data.data.equipmentSubtype === "heavyArmor"
    )
    
    let runMultiplier;
    if (heavyArmor)
        runMultiplier = 3;
    else
        runMultiplier = 4;
	return [{range: baseSpeed, color: playerColor}, {range: baseSpeed * 2, color: 0xFFFF00}, {range: baseSpeed * runMultiplier, color: 0xFF8000}]
}