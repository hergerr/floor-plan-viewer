import { IfcViewerAPI, ViewerOptions } from "web-ifc-viewer";
import { Color } from "three";

export default class ViewerSingleton {
  /**
   * Singleton which should provide one instance of IFCViewer
   * It is not book-definition singleton - ref is needed to
   * create one, and passing it through component tree is
   * not practical. Thus we really need to create that one
   * time, becuse pattern does not provide that by default.
   */
  private static instance: IfcViewerAPI;

  constructor(options: ViewerOptions) {
    const ifcViewer = new IfcViewerAPI({ container: options.container, backgroundColor: new Color(0xffffff) });
    ifcViewer.IFC.setWasmPath("../../"); 
    ifcViewer.axes.setAxes();
    ifcViewer.grid.setGrid();
    ifcViewer.IFC.loader.ifcManager.applyWebIfcConfig({
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: false
    });

    ViewerSingleton.instance = ifcViewer;
  }

  public static getInstance(): IfcViewerAPI {
    return this.instance;
  }
}
