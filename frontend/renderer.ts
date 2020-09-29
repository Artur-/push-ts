import {
  directive,
  Part,
  PropertyPart,
  render,
  TemplateResult,
} from "lit-html";

const previousValues = new WeakMap();

const itemRenderer = (f: (item: any) => TemplateResult) => (part: Part) => {
  if (!(part instanceof PropertyPart)) {
    throw new Error("renderer can only be set on a property");
  }
  if (previousValues.has(part)) {
    // The value will never change, it just has to be set once
    return;
  }

  if (typeof part.value != "function") {
    console.log("Creating renderer");
    const value = (root: HTMLElement, _column: any, data: any) => {
      render(f(data.item), root);
    };
    previousValues.set(part, value);
    part.setValue(value);
  }
};

const noContextRenderer = (f: () => TemplateResult) => (part: Part) => {
  if (!(part instanceof PropertyPart)) {
    throw new Error("renderer can only be set on a property");
  }
  if (previousValues.has(part)) {
    // The value will never change, it just has to be set once
    return;
  }
  if (typeof part.value != "function") {
    console.log("Creating renderer");
    const value = (root: HTMLElement) => {
      render(f(), root);
    };
    part.setValue(value);
    previousValues.set(part, value);
  }
};

export const renderer = directive(itemRenderer);
export const headerRenderer = directive(noContextRenderer);
