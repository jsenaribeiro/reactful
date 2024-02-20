"use server";
import { COLORS } from '@reactful/commons';
export const logger = {
    inline: false,
    insert(message, ...colors) {
        //if (this.inline) write('\n')
        write('\n' + message, ...colors);
        this.inline = false;
    },
    append(message, ...colors) {
        write(message, ...colors);
        this.inline = true;
    },
    itemfy(message, fill = true) {
        this.insert(`${fill ? '●' : '○'} `, "FG_GREEN");
        this.append(`${message} `, "RESET");
    }
};
export function log(message, ...colors) {
    write('\n' + message, ...colors);
}
function write(message, ...colors) {
    const R = COLORS["RESET"];
    const P = colors.map(k => COLORS[k]).join("");
    const C = colors.length > 0 ? P : R;
    Bun.write(Bun.stdout, `${C}${message}${R}`);
}
//# sourceMappingURL=log.js.map