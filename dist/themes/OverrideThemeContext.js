"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideThemeContext = void 0;
const typedoc_1 = require("typedoc");
const navigation_1 = require("../partials/navigation");
const header_1 = require("../partials/header");
class OverrideThemeContext extends typedoc_1.DefaultThemeRenderContext {
    constructor(theme, page, options) {
        super(theme, page, options);
        this.navigation = (0, navigation_1.navigation)(this);
        this.header = (0, header_1.header)(this);
    }
}
exports.OverrideThemeContext = OverrideThemeContext;
