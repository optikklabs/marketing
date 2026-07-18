import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { SectionHeader } from "../../sections/SectionHeader";
import { COMMAND_GROUPS } from "./CommandReferenceData";

export function CommandReference() {
  return (
    <section className="m-section" id="commands">
      <div className="m-container">
        <SectionHeader
          eyebrow="Command reference"
          title={
            <>
              Every command, <GradientText>in one place.</GradientText>
            </>
          }
          lede="The complete optikk surface. Add --help to any command for flags and examples, or run optikk agent schema to get the whole tree as JSON."
        />
        <Reveal>
          <div className="m-cmdref">
            {COMMAND_GROUPS.map((group) => (
              <article className="m-cmdref-card" key={group.command}>
                <header className="m-cmdref-head">
                  <code className="m-cmdref-cmd">optikk {group.command}</code>
                  <p className="m-cmdref-desc">{group.description}</p>
                </header>
                {group.subcommands && group.subcommands.length > 0 ? (
                  <ul className="m-cmdref-list">
                    {group.subcommands.map((sub) => (
                      <li key={sub.name}>
                        <code>{sub.name}</code>
                        <span>{sub.description}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
