import { Editor, rootCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { ReactEditor, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import React from "react";

const MilkdownEditor = () => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(nord)
      .use(commonmark)
  );
  return <ReactEditor editor={editor} />;
};

export default MilkdownEditor;
