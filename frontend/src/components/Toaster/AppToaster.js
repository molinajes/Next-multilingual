
import { Position, Toaster } from "@blueprintjs/core";
// import "../../../node_modules/@blueprintjs/core/src/components/toast/_toast.scss";

 
export const AppToaster = Toaster.create({
    className: "app__toaster",
    position: Position.TOP_RIGHT
});
