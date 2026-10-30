import PanelScene from '../components/panel/PanelScene';
import { LEFT_PANEL, LEFT_PRESETS, SQUIB_IDS, NOT_FULLY_DOCUMENTED } from './leftPanel';

// One panel definition, four views of it (what each slide highlights, which presets it offers).
const view = (highlight = [], presets = []) => function LeftView() {
  return <PanelScene panel={LEFT_PANEL} highlight={highlight} presets={presets} presetData={LEFT_PRESETS} />;
};

export const LeftPanelVisual = view();
export const LeftTypesVisual = view(SQUIB_IDS);
export const LeftSquibVisual = view(SQUIB_IDS, ['prelaunch', 'afterInsertion', 'tr256', 'afterRetroFire', 'landing']);
export const LeftGapsVisual = view(NOT_FULLY_DOCUMENTED);
