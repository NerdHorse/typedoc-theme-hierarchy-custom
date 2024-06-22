import { DefaultThemeRenderContext, JSX, PageEvent, Reflection, ReflectionKind, TypeParameterReflection } from "typedoc";

// Funções auxiliares simplificadas
const classNames = (classes: Record<string, boolean>): string =>
    Object.entries(classes).filter(([, value]) => value).map(([key]) => key).join(' ');

const getDisplayName = (model: Reflection): string => model.name;

const hasTypeParameters = (model: Reflection): boolean =>
    'typeParameters' in model && Array.isArray((model as any).typeParameters) && (model as any).typeParameters.length > 0;

const join = (separator: string, items: any[], mapper: (item: any) => string): string =>
    items.map(mapper).join(separator);

// Breadcrumb function
const breadcrumb = (context: DefaultThemeRenderContext, model: Reflection) => {
    const trail: Reflection[] = [];
    let current: Reflection | undefined = model;

    while (current) {
        if (!current.isProject() && current.kind !== ReflectionKind.Module) {
            trail.unshift(current);
        }
        current = current.parent;
    }

    return (
        <ul class="tsd-breadcrumb">
            {trail.map((item) => (
                // @ts-ignore
                <li key={item.id}>
                    <a href={context.urlTo(item)}>{item.name}</a>
                </li>
            ))}
        </ul>
    );
};

// Header function
export const header =
    (context: DefaultThemeRenderContext) =>
        (props: PageEvent<Reflection>): JSX.Element => {
            const HeadingLevel = props.model.isProject() ? "h2" : "h1";
            const model = props.model as Reflection & { typeParameters?: TypeParameterReflection[] };

            return (
                <div class="tsd-page-title">
                    {!!props.model.parent && <ul class="tsd-breadcrumb">{breadcrumb(context, props.model)}</ul>}
                    <HeadingLevel class={classNames({ deprecated: props.model.isDeprecated() })}>
                        {props.model.kind !== ReflectionKind.Project && `${ReflectionKind.singularString(props.model.kind)} `}
                        {getDisplayName(props.model)}
                        {hasTypeParameters(model) && (
                            <>
                                {"<"}
                                {join(", ", model.typeParameters || [], (item) => item.name)}
                                {">"}
                            </>
                        )}
                        {context.reflectionFlags(props.model)}
                    </HeadingLevel>
                </div>
            );
        };
