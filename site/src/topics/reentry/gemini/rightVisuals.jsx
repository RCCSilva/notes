import PanelScene from '../components/panel/PanelScene';
import {
  RIGHT_PANEL, RIGHT_PRESETS, POWER_IDS, DOCKING_IDS, SYSTEMS_IDS, NOT_FULLY_DOCUMENTED, CONFLICT_IDS,
} from './rightPanel';

// One panel definition, five views of it (what each slide highlights, which presets it offers).
const view = (highlight = [], presets = []) => function RightView() {
  return <PanelScene panel={RIGHT_PANEL} highlight={highlight} presets={presets} presetData={RIGHT_PRESETS} />;
};

export const RightPanelVisual = view();
export const RightPowerVisual = view(POWER_IDS, ['rightPad', 'rightPrelaunch', 'rightAfterInsertion', 'rightTr256', 'rightLandingNasa1', 'rightLandingNasa2', 'rightLandingGame']);
export const RightDockingVisual = view(DOCKING_IDS);
export const RightSystemsVisual = view(SYSTEMS_IDS);
export const RightGapsVisual = view([...NOT_FULLY_DOCUMENTED, ...CONFLICT_IDS]);
