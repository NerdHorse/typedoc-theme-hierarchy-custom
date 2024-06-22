"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideTheme = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const typedoc_1 = require("typedoc");
const OverrideThemeContext_1 = require("./OverrideThemeContext");
class OverrideTheme extends typedoc_1.DefaultTheme {
    constructor(renderer) {
        super(renderer);
        this.listenTo(this.owner, typedoc_1.RendererEvent.END, (event) => {
            fs_extra_1.default.copySync(
            // eslint-disable-next-line unicorn/prefer-module
            path_1.default.join(require.resolve('typedoc-theme-hierarchy'), '../assets'), path_1.default.join(event.outputDirectory, 'assets'));
        });
    }
    /**
     * Переопределяет стандартный контекст.
     */
    getRenderContext(page) {
        return new OverrideThemeContext_1.OverrideThemeContext(this, page, this.application.options);
    }
}
exports.OverrideTheme = OverrideTheme;
