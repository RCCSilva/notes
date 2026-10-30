import PanelScene from '../components/panel/PanelScene';
import { COMM_PANEL, COMM_PRESETS } from './commPanel';

// One panel definition, four views of it: what each slide highlights and which presets it offers.
const view = (highlight = [], presets = []) => function CommView() {
  return <PanelScene panel={COMM_PANEL} highlight={highlight} presets={presets} presetData={COMM_PRESETS} />;
};

export const FullPanelVisual = view();
export const ControlTypesVisual = view(['silence', 'hfAnt', 'mode1', 'mode2']);
export const InsertionVisual = view(['sBand', 'cBand', 'hfAnt'], ['insertion']);
export const HfVisual = view(['hfSel', 'mode1', 'mode2', 'tm', 'antSel'], ['useHf', 'beforeSeparation']);
