import { DefaultTheme, PageEvent, Reflection } from 'typedoc';
import { Renderer } from 'typedoc/dist/lib/output/renderer';
import { OverrideThemeContext } from './OverrideThemeContext';
export declare class OverrideTheme extends DefaultTheme {
    constructor(renderer: Renderer);
    /**
     * Переопределяет стандартный контекст.
     */
    getRenderContext(page: PageEvent<Reflection>): OverrideThemeContext;
}
