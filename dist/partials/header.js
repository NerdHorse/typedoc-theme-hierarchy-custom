"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
const typedoc_1 = require("typedoc");
// Funções auxiliares simplificadas
const classNames = (classes) => Object.entries(classes).filter(([, value]) => value).map(([key]) => key).join(' ');
const getDisplayName = (model) => model.name;
const hasTypeParameters = (model) => 'typeParameters' in model && Array.isArray(model.typeParameters) && model.typeParameters.length > 0;
const join = (separator, items, mapper) => items.map(mapper).join(separator);
// Breadcrumb function
const breadcrumb = (context, model) => {
    const trail = [];
    let current = model;
    while (current) {
        if (!current.isProject() && current.kind !== typedoc_1.ReflectionKind.Module) {
            trail.unshift(current);
        }
        current = current.parent;
    }
    return (typedoc_1.JSX.createElement("ul", { class: "tsd-breadcrumb" }, trail.map((item) => (
    // @ts-ignore
    typedoc_1.JSX.createElement("li", { key: item.id },
        typedoc_1.JSX.createElement("a", { href: context.urlTo(item) }, item.name))))));
};
// Header function
const header = (context) => (props) => {
    const HeadingLevel = props.model.isProject() ? "h2" : "h1";
    const model = props.model;
    return (typedoc_1.JSX.createElement("div", { class: "tsd-page-title" },
        !!props.model.parent && typedoc_1.JSX.createElement("ul", { class: "tsd-breadcrumb" }, breadcrumb(context, props.model)),
        typedoc_1.JSX.createElement(HeadingLevel, { class: classNames({ deprecated: props.model.isDeprecated() }) },
            props.model.kind !== typedoc_1.ReflectionKind.Project && `${typedoc_1.ReflectionKind.singularString(props.model.kind)} `,
            getDisplayName(props.model),
            hasTypeParameters(model) && (typedoc_1.JSX.createElement(typedoc_1.JSX.Fragment, null,
                "<",
                join(", ", model.typeParameters || [], (item) => item.name),
                ">")),
            context.reflectionFlags(props.model))));
};
exports.header = header;
