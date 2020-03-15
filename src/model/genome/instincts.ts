export type Instincts = Record<string, () => boolean>;

export const allInstincts: Instincts = {
    rightOne: () : boolean => {
        return true;
    },

    leftOne: () : boolean => {
        return true;
    }
};