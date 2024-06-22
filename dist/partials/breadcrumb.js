"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumb = void 0;
const typedoc_1 = require("typedoc");
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
exports.breadcrumb = breadcrumb;
