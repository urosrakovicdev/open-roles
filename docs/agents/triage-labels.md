# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

## Which label `/to-tickets` applies here

**`ready-for-human`.** The generic skill default is `ready-for-agent`, and it is
wrong for this repo: OpenRoles is a learning capstone and the human implements
every ticket (see [`../../CLAUDE.md`](../../CLAUDE.md) and the repo-specific rules
in [`issue-tracker.md`](issue-tracker.md)). `ready-for-agent` stays in the
vocabulary — it just never gets applied unless the human asks for it explicitly.

## Creating them in Linear

Linear will not invent labels on write. Create these five once in the workspace
(Settings → Labels, or the team's label list) before the first `/to-tickets` run,
or issue creation will fail on the unknown label.

In practice only `ready-for-human` is load-bearing today. `/triage` is for issues
you *didn't* create — bug reports and incoming requests — and a solo learning
project has none yet, so the other four can wait until it does.
