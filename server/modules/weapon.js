const guns = [
    "Glock 17",
    "Smith & Wesson M&P Shield",
    "Colt M1911",
    "Beretta 92FS",
    "Ruger 10/22",
    "Remington 870",
    "AR-15",
    "AK-47",
    "Sig Sauer P320",
    "Springfield XD",
    "Mossberg 500",
    "FN SCAR",
    "Browning Hi-Power",
    "Walther PPK",
    "CZ 75",
    "Heckler & Koch USP",
    "Desert Eagle",
    "Barrett M82",
    "Ruger Mark IV",
    "Winchester Model 70",
    "Benelli M4",
    "Steyr AUG",
    "Smith & Wesson Model 29",
    "Thompson submachine gun (Tommy Gun)",
    "Mauser C96",
    "FN FAL",
    "Smith & Wesson Model 500",
    "Taurus Judge",
    "Uzi",
    "Browning Automatic Rifle (BAR)",
    "Colt Python",
    "Glock 19",
    "Ruger SR1911",
    "HK MP5",
    "Mossberg 590",
    "Winchester Model 1894",
    "AR-10",
    "AK-74",
    "Sig Sauer P226",
    "CZ 550",
    "Smith & Wesson M&P15",
    "Remington 700",
    "Kel-Tec KSG",
    "FN Five-seveN",
    "Ruger LCP",
    "Beretta M9",
    "Browning A5",
    "Thompson/Center Arms Contender",
    "M1 Garand",
    "Smith & Wesson Model 686",
    "Glock 26",
    "Walther PPQ",
    "Remington 1100",
    "FN P90",
    "Sig Sauer MCX",
    "Colt AR-15",
    "Beretta Px4 Storm",
    "Browning BPS",
    "Ruger Redhawk",
    "Winchester Model 1897",
    "AKM",
    "HK416",
    "Smith & Wesson M&P Bodyguard",
    "Springfield M1903",
    "CZ 452",
    "Kel-Tec PMR-30",
    "Mossberg MVP",
    "Tavor TAR-21",
    "Remington Rolling Block",
    "Smith & Wesson Model 10",
    "Glock 43",
    "Ruger GP100",
    "Heckler & Koch G3",
    "FN Herstal F2000",
    "Browning X-Bolt",
    "Winchester Model 1886",
    "AR-9",
    "AK-103",
    "Sig Sauer P938",
    "CZ 527",
    "Smith & Wesson Model 15",
    "Ruger American",
    "Benelli Nova",
    "FN SCAR-L",
    "Colt Single Action Army (Peacemaker)",
    "Glock 22",
    "Walther PPS",
    "Remington Model 8",
    "Browning BLR",
    "Thompson/Center Arms Encore",
    "M14 rifle",
    "Smith & Wesson M&P Sport",
    "Kel-Tec SUB-2000",
    "Mossberg 930",
    "Winchester Model 1887",
    "AK-12",
    "HK417",
    "Smith & Wesson Model 36",
    "CZ 75 SP-01",
    "Colt AR-15A4"
]

const armor = [
    "Bulletproof Vest",
    "Chainmail",
    "Medieval Armor",
    "Kevlar Suit",
    "Plate Armor",
    "Riot Gear",
    "Ceramic Composite Armor",
    "Powered Exoskeleton Suit",
    "Titanium Mesh Armor"
]

const mods = [
    "Red dot sight",
    "Suppressor",
    "Extended magazine",
    "Custom grip",
    "Match-grade barrel",
    "Trigger upgrade",
    "Recoil compensator",
    "Muzzle brake",
    "Adjustable stock",
    "Enhanced bolt carrier",
    "Trigger guard modification",
    "Bipods",
    "Monopods",
    "Recoil pads",
    "Buffer tube upgrade",
    "Barrel flute",
    "Skeletonized receiver",
    "Quick detach sling mount",
    "Oversized charging handle",
    "Magazine wells",
    "Custom barrel threading",
    "Enhanced magazine release",
    "Reduced power recoil springs",
    "Enhanced safety selector",
    "Titanium components",
    "Skeletonized trigger",
    "Extended Barrel",
    "Competition trigger",
    "Recoil reduction system",
    "Recoil spring guide rods"
]

export function generateWeapon(modifications) {
    const modamount = modifications || [0,0,0,0,1,1,1,2,2,3][Math.floor(Math.random()*[0,0,0,0,1,1,1,2,2,3].length)];
    const armoramount = [1,1,1,2,2,3][Math.floor(Math.random()*[1,1,1,2,2,3].length)];
    const price = Math.floor(Math.random() * (500 - 50 + 1) + 50) * (modamount + 1);
    const damage = Math.floor(Math.random() * (10 - 5 + 1) + 5) * (modamount + 1);
    const selectedmods = [];
    for (let i = 0; i < modamount; i++) {
        selectedmods.push(mods[Math.floor(Math.random()*mods.length)]);
    }
    const selectedarmor = [];
    for (let i = 0; i < armoramount; i++) {
        selectedmods.push(armor[Math.floor(Math.random()*armor.length)]);
    }
    const weapon = {
        "name": guns[Math.floor(Math.random()*guns.length)],
        "price": price,
        "damage": damage,
        "effective_against": selectedarmor,
        "modifications": selectedmods
    }
    return weapon
}

export function upgradeWeapon(weapon) {
    const modamount = weapon.modifications.length;
    if(modamount < 3) {
        const upgradedWeapon = {
            "name": weapon.name,
            "price": weapon.price / modamount * (modamount + 1),
            "damage": weapon.damage / modamount * (modamount + 1),
            "effective_against": weapon.effective_against.push(armor[Math.floor(Math.random()*armor.length)]),
            "modifications": weapon.modifications.push(mods[Math.floor(Math.random()*mods.length)])
        }
        return upgradedWeapon
    } else {
        return {error: true, message: "Weapon is already fully upgraded!"}
    }
}