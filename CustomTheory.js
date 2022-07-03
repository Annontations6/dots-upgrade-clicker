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
        d2.getDescription = (_) => dots_symbol[1] + " | +" + dots_collect[1] + " | 0";
        d2.getInfo = (amount) => dots_symbol[1] + " | +" + dots_collect[1] + " | 0"
        d2.boughtOrRefunded = (_) => {
            currency.value += BigNumber.from(dots_collect[1])
            d2.level = 0;
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
    
    /////////////////
    //// Achievements
    achievement1 = theory.createAchievement(0, "Achievement 1", "Description 1", () => c1.level > 1);
    achievement2 = theory.createSecretAchievement(1, "Achievement 2", "Description 2", "Maybe you should buy two levels of c2?", () => c2.level > 1);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "My First Chapter", "This is line 1,\nand this is line 2.\n\nNice.", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "My Second Chapter", "This is line 1 again,\nand this is line 2... again.\n\nNice again.", () => c2.level > 0);

    updateAvailability();
}

var updateAvailability = () => {
    d2.isAvailable = unlockD2.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    currency.value += dt * bonus * getC1(c1.level).pow(getC1Exponent(c1Exp.level)) *
                                   getC2(c2.level).pow(getC2Exponent(c2Exp.level));
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

var getC1 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC2 = (level) => BigNumber.TWO.pow(level);
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();
