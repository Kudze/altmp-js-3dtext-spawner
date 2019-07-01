import alt from "alt";
import game from "natives";

let TEXT3D_LIST = [];

let findUnusedText3DID = () => {
    for(let i = 0; i < TEXT3D_LIST.length; i++)
        if(TEXT3D_LIST[i] === undefined) return i;

    return TEXT3D_LIST.length;
};

/**
 * Function is borrowed & edited from: https://forum.altv.mp/index.php?/topic/33-basic-3dtext/
 * 
 * @param x 
 * @param y 
 * @param z 
 * @param name 
 */
let draw3dText = (text3D) => {
    let pos = text3D.getPosition();

    const [bol, _x, _y] = game.getScreenCoordFromWorldCoord(pos.x, pos.y, pos.z);
    const camCord = game.getGameplayCamCoords();
    const dist = game.getDistanceBetweenCoords(camCord.x,camCord.y,camCord.z, pos.x, pos.y, pos.z, 1);

    if (dist > text3D.maxRenderDist) return;

    let scale = (4.00001/dist) * 0.3 * text3D.scale;
    if (scale > 0.2)
        scale = 0.2;

    const fov = (1/game.getGameplayCamFov())*100;
	scale = scale*fov;
  
    if (bol){
        game.setTextScale(scale, scale);
        game.setTextFont(text3D.font);
        game.setTextProportional(true);
        game.setTextColour(text3D.color[0], text3D.color[1], text3D.color[2], text3D.color[3]);
        game.setTextDropshadow(0, 0, 0, 0, 255);
        game.setTextEdge(2, 0, 0, 0, 150);
        game.setTextDropShadow();
        game.setTextOutline();
        game.setTextCentre(text3D.centre);
        game.beginTextCommandDisplayText("STRING");
        game.addTextComponentSubstringPlayerName(text3D.text);
        game.endTextCommandDisplayText(_x,_y + 0.025);
    }
}

export default {
    /**
     * @param text - STRING text (maxlen: 256);
     * @param pos - OBJECT {x,y,z} pos || FUNCTION pos;
     * @param options - OBJECT {font, color, centre, scale, maxRenderDist} options;
     */
    new: (text, pos, {font = 0, color = [255, 255, 255, 255], centre = true, scale = 1, maxRenderDist = 20} = {}) => {
        let id = findUnusedText3DID();

        TEXT3D_LIST[id] = {
            text: text,
            _pos: pos,
            font: font,
            color: color,
            centre: centre,
            scale: scale,
            maxRenderDist: maxRenderDist,
            getPosition() {
                const posType = typeof this._pos;

                if(posType === "function")
                    return this._pos();

                return this._pos;
            }
        };

        return {
            destroy: () => {
                TEXT3D_LIST[id] = undefined;
            },

            getPosition() {
                return TEXT3D_LIST[id].getPosition();
            },
            setPosition(position) {
                TEXT3D_LIST[id]._pos = position;
            },

            getText() {
                return TEXT3D_LIST[id].text;
            },
            setText(text) {
                TEXT3D_LIST[id].text = text;
            }
        };
    }
};

alt.on(
    'update',
    () => {
        TEXT3D_LIST.forEach(
            (text3D) => {
                if(text3D !== undefined) {
                    draw3dText(
                        text3D
                    );
                }
            }
        )
    }
)