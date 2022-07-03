import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "DUC";
var name = "Dots Upgrade Clicker";
var description = "A basic theory.";
var authors = "Annontations6";
var version = 1;

var currency;
var c1, c2;
var c1Exp, c2Exp;
var dots_symbol = ["\u2800", "\u2801", "\u2802", "\u2803", "\u2804", "\u2805", "\u2806", "\u2807", "\u2808", "\u2809", "\u280A", "\u280B", "\u280C", "\u280D", "\u280E", "\u280F", "\u2810"]
var dots_collect = [1, 5, 25, 125, 625, 3125, 15625, 78125, 390625, 1953125, 9765625, 48828125, 244140625, 1220703125, 6103515625, 30517578125, 152587890625]

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();

    ///////////////////
    // Regular Upgrades

    // d1
    {
        d1 = theory.createUpgrade(0, currency, new FreeCost());
        d1.getDescription = (_) => dots_symbol[0] + " | +" + dots_collect[0] + " | 0";
        d1.getInfo = (amount) => dots_symbol[0] + " | +" + dots_collect[0] + " | 0"
        d1.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[0])
            d1.level = 0;
        };
    }

    // d2
    {
        d2 = theory.createUpgrade(1, currency, new FreeCost());
        d2.getDescription = (_) => dots_symbol[1] + " | +" + dots_collect[1] + " | 1";
        d2.getInfo = (amount) => dots_symbol[1] + " | +" + dots_collect[1] + " | 1"
        d2.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[1])
            d2.level = 0;
        };
    }

    // d3
    {
        d3 = theory.createUpgrade(2, currency, new FreeCost());
        d3.getDescription = (_) => dots_symbol[2] + " | +" + dots_collect[2] + " | 2";
        d3.getInfo = (amount) => dots_symbol[2] + " | +" + dots_collect[2] + " | 2"
        d3.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[2])
            d3.level = 0;
        };
    }

    // d4
    {
        d4 = theory.createUpgrade(3, currency, new FreeCost());
        d4.getDescription = (_) => dots_symbol[3] + " | +" + dots_collect[3] + " | 3";
        d4.getInfo = (amount) => dots_symbol[3] + " | +" + dots_collect[3] + " | 3"
        d4.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[3])
            d4.level = 0;
        };
    }

    // d5
    {
        d5 = theory.createUpgrade(4, currency, new FreeCost());
        d5.getDescription = (_) => dots_symbol[4] + " | +" + dots_collect[4] + " | 4";
        d5.getInfo = (amount) => dots_symbol[4] + " | +" + dots_collect[4] + " | 4"
        d5.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[4])
            d5.level = 0;
        };
    }

    // d6
    {
        d6 = theory.createUpgrade(5, currency, new FreeCost());
        d6.getDescription = (_) => dots_symbol[5] + " | +" + dots_collect[5] + " | 5";
        d6.getInfo = (amount) => dots_symbol[5] + " | +" + dots_collect[5] + " | 5"
        d6.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[5])
            d6.level = 0;
        };
    }

    // d7
    {
        d7 = theory.createUpgrade(6, currency, new FreeCost());
        d7.getDescription = (_) => dots_symbol[6] + " | +" + dots_collect[6] + " | 6";
        d7.getInfo = (amount) => dots_symbol[6] + " | +" + dots_collect[6] + " | 6"
        d7.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[6])
            d7.level = 0;
        };
    }

    // d8
    {
        d8 = theory.createUpgrade(7, currency, new FreeCost());
        d8.getDescription = (_) => dots_symbol[7] + " | +" + dots_collect[7] + " | 7";
        d8.getInfo = (amount) => dots_symbol[7] + " | +" + dots_collect[7] + " | 7"
        d8.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[7])
            d8.level = 0;
        };
    }

    // d9
    {
        d9 = theory.createUpgrade(8, currency, new FreeCost());
        d9.getDescription = (_) => dots_symbol[8] + " | +" + dots_collect[8] + " | 8";
        d9.getInfo = (amount) => dots_symbol[8] + " | +" + dots_collect[8] + " | 8"
        d9.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[8])
            d9.level = 0;
        };
    }

    // d10
    {
        d10 = theory.createUpgrade(9, currency, new FreeCost());
        d10.getDescription = (_) => dots_symbol[9] + " | +" + dots_collect[9] + " | 9";
        d10.getInfo = (amount) => dots_symbol[9] + " | +" + dots_collect[9] + " | 9"
        d10.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[9])
            d10.level = 0;
        };
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 50);
    theory.createBuyAllUpgrade(1, currency, BigNumber.from("ee99999"));
    theory.createAutoBuyerUpgrade(2, currency, BigNumber.from("ee99999"));

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(Math.log10(250), Math.log10(6)));

    {
        unlockD2 = theory.createMilestoneUpgrade(0, 1);
        unlockD2.description = "Used dots 2.";
        unlockD2.info = "Used dots 2.";
        unlockD2.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD3 = theory.createMilestoneUpgrade(1, 1);
        unlockD3.description = "Used dots 3.";
        unlockD3.info = "Used dots 3.";
        unlockD3.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD4 = theory.createMilestoneUpgrade(2, 1);
        unlockD4.description = "Used dots 4.";
        unlockD4.info = "Used dots 4.";
        unlockD4.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD5 = theory.createMilestoneUpgrade(3, 1);
        unlockD5.description = "Used dots 5.";
        unlockD5.info = "Used dots 5.";
        unlockD5.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD6 = theory.createMilestoneUpgrade(4, 1);
        unlockD6.description = "Used dots 6.";
        unlockD6.info = "Used dots 6.";
        unlockD6.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD7 = theory.createMilestoneUpgrade(5, 1);
        unlockD7.description = "Used dots 7.";
        unlockD7.info = "Used dots 7.";
        unlockD7.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD8 = theory.createMilestoneUpgrade(6, 1);
        unlockD8.description = "Used dots 8.";
        unlockD8.info = "Used dots 8.";
        unlockD8.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD9 = theory.createMilestoneUpgrade(7, 1);
        unlockD9.description = "Used dots 9.";
        unlockD9.info = "Used dots 9.";
        unlockD9.boughtOrRefunded = (_) => updateAvailability();
    }

    {
        unlockD10 = theory.createMilestoneUpgrade(8, 1);
        unlockD10.description = "Used dots 10.";
        unlockD10.info = "Used dots 10.";
        unlockD10.boughtOrRefunded = (_) => updateAvailability();
    }
    

    updateAvailability();
}

var updateAvailability = () => {
    d2.isAvailable = unlockD2.level > 0;
    d3.isAvailable = unlockD3.level > 0;
    d4.isAvailable = unlockD4.level > 0;
    d5.isAvailable = unlockD5.level > 0;
    d6.isAvailable = unlockD6.level > 0;
    d7.isAvailable = unlockD7.level > 0;
    d8.isAvailable = unlockD8.level > 0;
    d9.isAvailable = unlockD9.level > 0;
    d10.isAvailable = unlockD10.level > 0;
}

var tick = (elapsedTime, multiplier) => {
// coming soon
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = 0";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(0.164) / BigNumber.THREE;
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{0.164}}{3}";
var getTau = () => currency.value;
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

init();
