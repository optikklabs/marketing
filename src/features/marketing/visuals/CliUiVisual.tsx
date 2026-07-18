import { DashboardMock } from "./DashboardMock";
import { Screenshot } from "./Screenshot";
import { TerminalWindow } from "./TerminalWindow";

interface CliUiVisualProps {
  readonly session: string;
  readonly terminalTitle?: string;
  readonly screenshot: {
    readonly name: Parameters<typeof Screenshot>[0]["name"];
    readonly alt: string;
    readonly mock: Parameters<typeof DashboardMock>[0]["type"];
  };
}

/**
 * One framed pane that shows a CLI session on top and the equivalent web-UI
 * view beneath it — the "run the command, get the view" story. Designed to sit
 * inside a Split's `.m-split-visual` frame, which supplies the outer border.
 */
export function CliUiVisual({ session, terminalTitle, screenshot }: CliUiVisualProps) {
  return (
    <div className="m-cli-ui">
      <TerminalWindow title={terminalTitle}>{session}</TerminalWindow>
      <div className="m-cli-ui-shot">
        <Screenshot
          name={screenshot.name}
          alt={screenshot.alt}
          bare
          fallback={<DashboardMock type={screenshot.mock} />}
        />
      </div>
    </div>
  );
}
