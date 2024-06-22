import { DefaultTheme, DefaultThemeRenderContext, Options, PageEvent, Reflection } from 'typedoc';
export declare class OverrideThemeContext extends DefaultThemeRenderContext {
    constructor(theme: DefaultTheme, page: PageEvent<Reflection>, options: Options);
}
