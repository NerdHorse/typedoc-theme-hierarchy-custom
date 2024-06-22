import {
  DefaultTheme,
  DefaultThemeRenderContext,
  Options,
  PageEvent,
  Reflection,
} from 'typedoc';
import { navigation } from '../partials/navigation';
import {header} from "../partials/header";

export class OverrideThemeContext extends DefaultThemeRenderContext {
  public constructor(
    theme: DefaultTheme,
    page: PageEvent<Reflection>,
    options: Options,
  ) {
    super(theme, page, options);

    this.navigation = navigation(this);
    this.header = header(this);
  }
}
