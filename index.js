/**
 * Created by Riven on 2017/10/25 0025.
 * import music
 * import speech
 * import radio
 */
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ibWljcm9iaXQtbG9nbyIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCA0MC43MDUwMDIgNDAuNzA1MDAxIgogICBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMTMgNTUiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJiYmMtbWljcm9iaXQtd2hpdGUgKDEpLnN2ZyIKICAgd2lkdGg9IjQwLjcwNTAwMiIKICAgaGVpZ2h0PSI0MC43MDUwMDIiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQ5Ij48cmRmOlJERj48Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcwogICAgIGlkPSJkZWZzNDciIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMjUzIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg1NiIKICAgICBpZD0ibmFtZWR2aWV3NDUiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIgogICAgIGlua3NjYXBlOnpvb209IjEyLjM5NDM2NiIKICAgICBpbmtzY2FwZTpjeD0iMTcuNDY4MDc1IgogICAgIGlua3NjYXBlOmN5PSIxNy40Nzc5MDYiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjI0IgogICAgIGlua3NjYXBlOndpbmRvdy15PSIxMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Im1pY3JvYml0LWxvZ28iIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGgzOSIKICAgICBkPSJtIDI4Ljg3NCwyMi43MDEwMDEgYyAxLjI5OCwwIDIuMzQ3LC0xLjA1MyAyLjM0NywtMi4zNDkgMCwtMS4yOTYgLTEuMDQ4LC0yLjM0ODAwMSAtMi4zNDcsLTIuMzQ4MDAxIC0xLjI5NywwIC0yLjM0OCwxLjA1MjAwMSAtMi4zNDgsMi4zNDgwMDEgMC4wMDEsMS4yOTYgMS4wNTEsMi4zNDkgMi4zNDgsMi4zNDkiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGg0MSIKICAgICBkPSJtIDExLjYzLDE4LjAwNCBjIC0xLjI5NywwIC0yLjM0OSwxLjA1MjAwMSAtMi4zNDksMi4zNDgwMDEgMCwxLjI5NiAxLjA1MiwyLjM0OSAyLjM0OSwyLjM0OSAxLjI5NiwwIDIuMzQ3LC0xLjA1MyAyLjM0NywtMi4zNDkgMCwtMS4yOTYgLTEuMDUxLC0yLjM0ODAwMSAtMi4zNDcsLTIuMzQ4MDAxIiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZiIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoNDMiCiAgICAgZD0ibSAxMS42MywxMy4zNzQ1IGMgLTMuODQ4LDAgLTYuOTc4LDMuMTI5IC02Ljk3OCw2Ljk3ODAwMSAwLDMuODQ4IDMuMTMsNi45NzggNi45NzgsNi45NzggbCAxNy40NDUsMCBjIDMuODQ4LDAgNi45NzcsLTMuMTMgNi45NzcsLTYuOTc4IDAsLTMuODQ5MDAxIC0zLjEyOSwtNi45NzgwMDEgLTYuOTc3LC02Ljk3ODAwMSBsIC0xNy40NDUsMCBtIDE3LjQ0NSwxOC42MDgwMDEgLTE3LjQ0NSwwIGMgLTYuNDEzLDAgLTExLjYzLC01LjIxNyAtMTEuNjMsLTExLjYzIEMgMCwxMy45Mzk1IDUuMjE3LDguNzIyNTAwNCAxMS42Myw4LjcyMjUwMDQgbCAxNy40NDUsMCBjIDYuNDEzLDAgMTEuNjMsNS4yMTY5OTk2IDExLjYzLDExLjYzMDAwMDYgLTEwZS00LDYuNDEzIC01LjIxNywxMS42MyAtMTEuNjMsMTEuNjMiIC8+PC9zdmc+';

/**
 * Icon svg to be displayed in the menu encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4KCjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ibWljcm9iaXQtbG9nbyIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCA0MC43MDUwMDIgNDAuNzA1MDAxIgogICBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMTMgNTUiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJiYmMtbWljcm9iaXQtYmxhY2sgKDEpLnN2ZyIKICAgd2lkdGg9IjQwLjcwNTAwMiIKICAgaGVpZ2h0PSI0MC43MDUwMDIiPjxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTQ5Ij48cmRmOlJERj48Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+PGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+PGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPjxkYzp0aXRsZT48L2RjOnRpdGxlPjwvY2M6V29yaz48L3JkZjpSREY+PC9tZXRhZGF0YT48ZGVmcwogICAgIGlkPSJkZWZzNDciIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMjUzIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwNzYiCiAgICAgaWQ9Im5hbWVkdmlldzQ1IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBmaXQtbWFyZ2luLXRvcD0iMCIKICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiCiAgICAgZml0LW1hcmdpbi1yaWdodD0iMCIKICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCIKICAgICBpbmtzY2FwZTp6b29tPSIxLjU0OTI5NTgiCiAgICAgaW5rc2NhcGU6Y3g9IjQyLjIzNyIKICAgICBpbmtzY2FwZTpjeT0iMTIuNjI4IgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxNDYwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSI0MyIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Im1pY3JvYml0LWxvZ28iIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGgzOSIKICAgICBkPSJtIDI4Ljg3NCwyMi43MDEwMDEgYyAxLjI5OCwwIDIuMzQ3LC0xLjA1MyAyLjM0NywtMi4zNDkgMCwtMS4yOTYgLTEuMDQ4LC0yLjM0ODAwMSAtMi4zNDcsLTIuMzQ4MDAxIC0xLjI5NywwIC0yLjM0OCwxLjA1MjAwMSAtMi4zNDgsMi4zNDgwMDEgMC4wMDEsMS4yOTYgMS4wNTEsMi4zNDkgMi4zNDgsMi4zNDkiIC8+PHBhdGgKICAgICBzdHlsZT0iZmlsbDojMDAwMDAwIgogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgaWQ9InBhdGg0MSIKICAgICBkPSJtIDExLjYzLDE4LjAwNCBjIC0xLjI5NywwIC0yLjM0OSwxLjA1MjAwMSAtMi4zNDksMi4zNDgwMDEgMCwxLjI5NiAxLjA1MiwyLjM0OSAyLjM0OSwyLjM0OSAxLjI5NiwwIDIuMzQ3LC0xLjA1MyAyLjM0NywtMi4zNDkgMCwtMS4yOTYgLTEuMDUxLC0yLjM0ODAwMSAtMi4zNDcsLTIuMzQ4MDAxIiAvPjxwYXRoCiAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMCIKICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgIGlkPSJwYXRoNDMiCiAgICAgZD0ibSAxMS42MywxMy4zNzQ1IGMgLTMuODQ4LDAgLTYuOTc4LDMuMTI5IC02Ljk3OCw2Ljk3ODAwMSAwLDMuODQ4IDMuMTMsNi45NzggNi45NzgsNi45NzggbCAxNy40NDUsMCBjIDMuODQ4LDAgNi45NzcsLTMuMTMgNi45NzcsLTYuOTc4IDAsLTMuODQ5MDAxIC0zLjEyOSwtNi45NzgwMDEgLTYuOTc3LC02Ljk3ODAwMSBsIC0xNy40NDUsMCBtIDE3LjQ0NSwxOC42MDgwMDEgLTE3LjQ0NSwwIGMgLTYuNDEzLDAgLTExLjYzLC01LjIxNyAtMTEuNjMsLTExLjYzIEMgMCwxMy45Mzk1IDUuMjE3LDguNzIyNTAwNCAxMS42Myw4LjcyMjUwMDQgbCAxNy40NDUsMCBjIDYuNDEzLDAgMTEuNjMsNS4yMTY5OTk2IDExLjYzLDExLjYzMDAwMDYgLTEwZS00LDYuNDEzIC01LjIxNywxMS42MyAtMTEuNjMsMTEuNjMiIC8+PC9zdmc+';

const isNumber = n => {
    n = n.replace(/'/g, '')
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let leftSpeed = 0;
let rightSpeed = 0;
let servoSpeed = 300;
let servo1Angle = 0;
let servo2Angle = 0;
let servo3Angle = 0;
let servo4Angle = 0;
let servo5Angle = 0;
let servo6Angle = 0;

var that;

const noteMap = {"全":"16","二":"8","四":"4","八":"2","十六":"1"};

let waiting = false;

class dailyCode {
    constructor (runtime){
        this.runtime = runtime;
        this.comm = runtime.ioDevices.comm;
        this.session = null;
        this.runtime.registerPeripheralExtension('dailyCode', this);
        // session callbacks
        this.onmessage = this.onmessage.bind(this);
        this.onclose = this.onclose.bind(this);

        this.decoder = new TextDecoder();
        this.lineBuffer = '';
    }

    write (data){
        if (!data.endsWith('\n')) data += '\n';
        if (this.session) this.session.write(data);
    }

    report (data){
        return new Promise(resolve => {
            this.write(data);
            this.reporter = resolve;
        });
    }


    onmessage (data){
        const dataStr = this.decoder.decode(data);
        this.lineBuffer += dataStr;
        if (this.lineBuffer.indexOf('\n') !== -1){
            const lines = this.lineBuffer.split('\n');
            this.lineBuffer = lines.pop();
            for (const l of lines){
                if (l.startsWith('M') && this.reporter){
                    this.reporter(l);
                }
            }
        }
    }

    onclose (error){
        log.warn('on close', error);
        this.session = null;
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_ERROR);
        console.log("close");
    }

    // method required by vm runtime
    scan (){
        this.comm.getDeviceList().then(result => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }

    connect (id){
    	console.log(id);
        this.comm.connect(id).then(sess => {
            this.session = sess;
            this.session.onmessage = this.onmessage;
            this.session.onclose = this.onclose;
            // notify gui connected
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);
			
			that = this;
			document.onkeydown=function(event){
				console.log(event.keyCode);
				console.log(that)
				if(event.keyCode==27){
					if (that.session) that.session.write('motorRun(0, 0)\r\n');
				}
			}
        }).catch(err => {
            log.warn('connect peripheral fail', err);
        });
    }

    disconnect (){
        this.session.close();
        console.log("disconnect");
    }

    isConnected (){
        return Boolean(this.session);
    }

	wait (args, util) {
		waiting = true;
        if (util.stackTimerNeedsInit()) {
            const duration = Math.max(0, args);
			console.log(duration);
            util.startStackTimer(duration);
            this.runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished()) {
            util.yield();
        } else if(util.stackTimerFinished()){
			waiting = false;
		}
    }

    /**
     * @return {object} This extension's metadata.
     */
    getInfo (){
        return {
            id: 'dailyCode',

            name: '酷创客',
            color1: '#F16C20',
            color2: '#C2561A',
            color3: '#C2561A',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,

            blocks: [
//				{
//                    opcode: 'reset',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.reset',
//                        default: '重启机器人'
//                    }),
//                    arguments: {
//                    },
//                    func: 'reset'
//                },
            	{
                    blockType: BlockType.DIVLABEL,
                    text: "LED显示"
                },
                {
                    opcode: 'showledmat',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.showledmat',
                        default: '显示图标 [ICON]'
                    }),
                    arguments: {
                        ICON: {
                            type: ArgumentType.BITLEDS,
                            defaultValue: '90009:09090:00900:09090:90009'
                        }
                    },
                    func: 'showledmat'
                },
                {
                    opcode: 'showicon',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.showicon',
                        default: '显示图标 [ICON]'
                    }),
                    arguments: {
                        ICON: {
                            type: ArgumentType.STRING,
                            menu: '#imageMenu#microbit',
                            defaultValue: 'HEART'
                        }
                    },
                    func: 'showicon'
                },
                {
                    opcode: 'showstring',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.showstring',
                        default: '显示文字 [STR]'
                    }),
                    arguments: {
                        STR: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hello'
                        }
                    },
                    func: 'showstring',
//                    sepafter: 36
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "环境监测"
                },
                {
                    opcode: 'temperature',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.temperature',
                        default: '主板温度'
                    }),
                    arguments: {
                    },
                    func: 'temperature',
                },
                {
                    opcode: 'read_light_level',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.read_light_level',
                        default: '周围亮度'
                    }),
                    arguments: {
                    },
                    func: 'read_light_level',
//                    sepafter: 36
                },
                {
                    opcode: 'get_field_strength',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.get_field_strength',
                        default: '周围磁场强度'
                    }),
                    arguments: {
                    },
                    func: 'get_field_strength',
//                    sepafter: 36
                },
                {
                    opcode: 'getVolume ',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.getVolume',
                        default: '周围声音'
                    }),
                    arguments: {
                    },
                    func: 'getVolume',
//                    sepafter: 36
                },
                {
                    opcode: 'battery ',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.battery',
                        default: '电池电量'
                    }),
                    arguments: {
                    },
                    func: 'battery',
//                    sepafter: 36
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "声音控制"
                },
				{
                    opcode: 'noteplay',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.noteplay',
                        default: '播放音符[NOTE]时长[DURATION]'
                    }),
                    arguments: {
                        DURATION: {
                            type: ArgumentType.STRING,
                            menu: 'durationMenu',
                            defaultValue: '四'
                        },
						NOTE: {
                            type: ArgumentType.STRING,
                            menu: 'noteMenu',
                            defaultValue: 'C4'
                        }
                    },
                    func: 'noteplay'
                },
                {
                    opcode: 'musicplay',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.musicplay',
                        default: '音乐播放 [MUSIC]'
                    }),
                    arguments: {
                        MUSIC: {
                            type: ArgumentType.STRING,
                            menu: 'musicMenu',
                            defaultValue: 'POWER_UP'
                        }
                    },
                    func: 'musicplay'
                },
                {
                    opcode: 'musicpitch',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.musicpitch',
                        default: '音调频率[FREQ] 播放[LEN]毫秒'
                    }),
                    arguments: {
                        FREQ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 880
                        },
                        LEN: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100
                        }
                    },
                    func: 'musicpitch'
                },
                {
                    opcode: 'speech',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.speech',
                        default: '机器人语音 [TXT]'
                    }),
                    arguments: {
                        TXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello, World'
                        }
                    },
                    func: 'speech'
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "按钮"
                },
                {
                    opcode: 'button',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'dailyCode.button',
                        default: '按键 [BUTTON]'
                    }),
                    arguments: {
                        BUTTON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'A',
                            menu: 'buttonMenu'
                        }
                    },
                    func: 'button',
//                    sepafter: 36
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "加速度计"
                },
                {
                    opcode: 'accelerometer',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.accelerometer',
                        default: '陀螺仪 [DIRECTION]'
                    }),
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'accMenu',
                            defaultValue: 'x'
                        }
                    },
                    func: 'accelerometer'
                },
                {
                    opcode: 'isgesture',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'dailyCode.isgesture',
                        default: '手势 [GESTURE]'
                    }),
                    arguments: {
                        GESTURE: {
                            type: ArgumentType.STRING,
                            menu: 'gestureMenu',
                            defaultValue: 'up'
                        }
                    },
                    func: 'isgesture',
//                    sepafter: 36
                },
                {
                    opcode: 'calibrate',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.calibrate',
                        default: '指南针校准'
                    }),
                    arguments: {
                    },
                    func: 'calibrate'
                },
                {
                    opcode: 'heading',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.heading',
                        default: '指南针'
                    }),
                    arguments: {
                    },
                    func: 'heading',
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "无线通信"
                },
                {
                    opcode: 'radioswitch',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.radioswitch',
                        default: '无线开关 [SWITCH]'
                    }),
                    arguments: {
                        SWITCH: {
                            type: ArgumentType.STRING,
                            menu: 'onoffMenu',
                            defaultValue: 'on'
                        }
                    },
                    func: 'radioswitch'
                },
                {
                    opcode: 'radiochannel',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.radiochannel',
                        default: '无线频道 [CHANNEL]'
                    }),
                    arguments: {
                        CHANNEL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 7
                        }
                    },
                    func: 'radiochannel'
                },
                {
                    opcode: 'radiosend',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.radiosend',
                        default: '无线发送 [TEXT]'
                    }),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hello'
                        }
                    },
                    func: 'radiosend'
                },
                {
                    opcode: 'radioreceive',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.radioreceive',
                        default: '无线接收'
                    }),
                    arguments: {
                    },
                    func: 'radioreceive',
//                    sepafter: 36
                },
//                {
//                    opcode: 'digiwrite',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.digiwrite',
//                        default: '数字信号写入 [PIN] value [LEVEL]'
//                    }),
//                    arguments: {
//                        PIN: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'P0',
//                            menu: 'bitPins'
//                        },
//                        LEVEL: {
//                            type: ArgumentType.NUMBER,
//                            defaultValue: 1
//                        }
//                    },
//                    func: 'digiwrite'
//                },
//                {
//                    opcode: 'digiread',
//                    blockType: BlockType.BOOLEAN,
//
//                    text: formatMessage({
//                        id: 'dailyCode.digiread',
//                        default: '数字信号读取 [PIN]'
//                    }),
//                    arguments: {
//                        PIN: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'P0',
//                            menu: 'bitPins'
//                        }
//                    },
//                    func: 'digiread'
//                },
//                {
//                    opcode: 'analogwrite',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.analogwrite',
//                        default: '模拟信号写入 [PIN] value [VALUE]'
//                    }),
//                    arguments: {
//                        PIN: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'P0',
//                            menu: 'bitPins'
//                        },
//                        VALUE: {
//                            type: ArgumentType.NUMBER,
//                            defaultValue: 123
//                        }
//                    },
//                    func: 'analogwrite'
//                },
//                {
//                    opcode: 'analogread',
//                    blockType: BlockType.REPORTER,
//
//                    text: formatMessage({
//                        id: 'dailyCode.analogread',
//                        default: '模拟信号读取 [PIN]'
//                    }),
//                    arguments: {
//                        PIN: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'P0',
//                            menu: 'bitPins'
//                        }
//                    },
//                    func: 'analogread'
//                },
//                {
//                    opcode: 'pinpull',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.pinpull',
//                        default: '引脚 [PIN] 设置上下拉 [PULL]'
//                    }),
//                    arguments: {
//                        PIN: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'P0',
//                            menu: 'bitPins'
//                        },
//                        PULL: {
//                            type: ArgumentType.STRING,
//                            defaultValue: '0',
//                            menu: 'bitPull'
//                        }
//                    },
//                    func: 'pinpull',
//                    sepafter: 36
//                },
//                {
//                    opcode: 'print',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.print',
//                        default: '串口打印 [TEXT]'
//                    }),
//                    arguments: {
//                        TEXT: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'hello'
//                        }
//                    },
//                    func: 'print'
//                },
//                {
//                    opcode: 'printvalue',
//                    blockType: BlockType.COMMAND,
//
//                    text: formatMessage({
//                        id: 'dailyCode.printvalue',
//                        default: '串口打印 [TEXT] = [VALUE]'
//                    }),
//                    arguments: {
//                        TEXT: {
//                            type: ArgumentType.STRING,
//                            defaultValue: 'hello'
//                        },
//                        VALUE: {
//                            type: ArgumentType.NUMBER,
//                            defaultValue: 100
//                        }
//                    },
//                    func: 'printvalue'
//                },

                {
                    blockType: BlockType.DIVLABEL,
                    text: "电机控制"
                },
                {
                    opcode: 'motorRun',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.motorRun',
                        default: '[SIDE]侧电机速度[SPEED]'
                    }),
                    arguments: {
                    	SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左+右',
                            menu: 'sideMenu'
                        },
                    	SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 60
                        }
                    },
                    func: 'motorRun'
                },
                {
                    opcode: 'motorStop',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.motorStop',
                        default: '[SIDE]侧电机停转'
                    }),
                    arguments: {
                    	SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左+右',
                            menu: 'sideMenu'
                        }
                    },
                    func: 'motorStop'
                },
                //{
                //    opcode: 'motorRunDelay',
                //    blockType: BlockType.COMMAND,

                //    text: formatMessage({
                //        id: 'dailyCode.motorRunDelay',
                //        default: '[SIDE]侧电机运行[SECOND]秒'
                //    }),
                //    arguments: {
                //    	SIDE: {
                //            type: ArgumentType.STRING,
                //            defaultValue: '左+右',
                //            menu: 'sideMenu'
                //        },
                //        SECOND: {
                //        	type: ArgumentType.NUMBER,
                //            defaultValue: '1',
                //        }
                //    },
                //    func: 'motorRunDelay'
                //},
                {
                    opcode: 'getMotorSpeed',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.getMotorSpeed',
                        default: '[SIDE]侧电机速度'
                    }),
                    arguments: {
                    	SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左+右',
                            menu: 'sideMenu'
                        }
                    },
                    func: 'getMotorSpeed',
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "舵机控制"
                },
                {
                    opcode: 'servoMove',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.servoMove',
                        default: '[SERVOINDEX]号舵转[ANGLE]度'
                    }),
                    arguments: {
                    	SERVOINDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: 'servoindex'
                        },
                        ANGLE: {
                        	type: ArgumentType.NUMBER,
                            defaultValue: '0',
                        }
                        
                    },
                    func: 'servoMove'
                },
                {
                    opcode: 'servoSpeed',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.servoSpeed',
                        default: '设置舵机速度[SPEED]'
                    }),
                    arguments: {
                    	SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5',
                            menu: 'servoSpeed'
                        }
                        
                    },
                    func: 'servoSpeed'
                },
                {
                    opcode: 'servoAngle',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.servoAngle',
                        default: '[SERVOINDEX]号舵机角度'
                    }),
                    arguments: {
                    	SERVOINDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: 'servoindex'
                        }
                    },
                    func: 'servoAngle',
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "传感器"
                },
                {
                    opcode: 'sonic',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.sonic',
                        default: '超声波传感器'
                    }),
                    arguments: {
                    },
                    func: 'sonic',
                },
                /*{
                    opcode: 'lineFollowerSensor',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.lineFollowerSensor',
                        default: '[SIDE]侧巡线传感器'
                    }),
                    arguments: {
                    	SONICINDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: 'servoindex'
                        },
                        SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左',
                            menu: 'directionMenu'
                        }
                    },
                    func: 'lineFollowerSensor',
                },
                {
                    opcode: 'lineFollower',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'dailyCode.lineFollower',
                        default: '[SIDE]侧巡线[COLOR]，阈值[VALUE]'
                    }),
                    arguments: {
                    	SIDE: {
                    		type: ArgumentType.STRING,
                            defaultValue: '左',
                            menu: 'directionMenu'
                        },
                        COLOR: {
                    		type: ArgumentType.STRING,
                            defaultValue: '白',
                            menu: 'lineFollowerColor'
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '500'
                        },
                    },
                    func: 'lineFollower',
//                    sepafter: 36
                },*/
				{
                    opcode: 'irrec',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.irrec',
                        default: '红外线接收器'
                    }),
                    arguments: {
                    },
                    func: 'irrec',
                },
				{
                    opcode: 'fourRoadLineFollowerSensor',
                    blockType: BlockType.BOOLEAN,

                    text: formatMessage({
                        id: 'dailyCode.fourRoadLineFollowerSensor',
                        default: '巡线传感器[INDEX]号检测到[COLOR]色'
                    }),
                    arguments: {
                    	INDEX: {
                    		type: ArgumentType.NUMBER,
                            defaultValue: '1',
                            menu: 'fourRoadLineFollowerIndex'
                        },
                        COLOR: {
                    		type: ArgumentType.STRING,
                            defaultValue: '黑',
                            menu: 'lineFollowerColor'
                        }
                    },
                    func: 'fourRoadLineFollowerSensor',
//                    sepafter: 36
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "LED彩灯"
                },
                {
                    opcode: 'rgbLed',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.rgbLed',
                        default: '[SIDE]侧彩灯[COLOR]色'
                    }),
                    arguments: {
                    	SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左',
                            menu: 'sideMenu'
                        },
                        COLOR: {
                            type: ArgumentType.STRING,
                            defaultValue: '红',
                            menu: 'color'
                        }
                    },
                    func: 'rgbLed'
                },
                {
                    opcode: 'rgbLedValue',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.rgbLedValue',
                        default: '[SIDE]侧彩灯 R[R]G[G]B[B]'
                    }),
                    arguments: {
                    	SIDE: {
                            type: ArgumentType.STRING,
                            defaultValue: '左',
                            menu: 'sideMenu'
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '255'
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    func: 'rgbLedValue'
                },
                {
                    opcode: 'rgbLedClose',
                    blockType: BlockType.COMMAND,

                    text: formatMessage({
                        id: 'dailyCode.rgbLedClose',
                        default: '关闭彩灯'
                    }),
                    arguments: {
                    },
                    func: 'rgbLedClose'
                },
                {
                    blockType: BlockType.DIVLABEL,
                    text: "数据处理"
                },
                {
                    opcode: 'strToHex',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.strToHex',
                        default: '[STR]转16进制'
                    }),
                    arguments: {
                    	STR: {
                            type: ArgumentType.STRING,
                            defaultValue: '文字'
                        }
                    },
                    func: 'strToHex',
                },
                {
                    opcode: 'hexToStr',
                    blockType: BlockType.REPORTER,

                    text: formatMessage({
                        id: 'dailyCode.hexToStr',
                        default: '[HEX]转文字'
                    }),
                    arguments: {
                    	HEX: {
                            type: ArgumentType.STRING,
                            defaultValue: '3136E8BF9BE588B6'
                        }
                    },
                    func: 'hexToStr',
                },
            ],
            menus: {
                '#imageMenu#microbit': [
                    {src: 'static/extension-assets/microbit/heart.png',
                        value: 'HEART', width: 48, height: 48, alt: 'heart'},
                    {src: 'static/extension-assets/microbit/smallheart.png',
                        value: 'HEART_SMALL', width: 48, height: 48, alt: 'smallheart'},
                    {src: 'static/extension-assets/microbit/yes.png',
                        value: 'YES', width: 48, height: 48, alt: 'yes'},
                    {src: 'static/extension-assets/microbit/no.png',
                        value: 'NO', width: 48, height: 48, alt: 'no'},
                    {src: 'static/extension-assets/microbit/happy.png',
                        value: 'HAPPY', width: 48, height: 48, alt: 'happy'},
                    {src: 'static/extension-assets/microbit/sad.png',
                        value: 'SAD', width: 48, height: 48, alt: 'sad'},
                    {src: 'static/extension-assets/microbit/confused.png',
                        value: 'CONFUSED', width: 48, height: 48, alt: 'confused'},
                    {src: 'static/extension-assets/microbit/angry.png',
                        value: 'ANGRY', width: 48, height: 48, alt: 'angry'},
                    {src: 'static/extension-assets/microbit/asleep.png',
                        value: 'ASLEEP', width: 48, height: 48, alt: 'asleep'},
                    {src: 'static/extension-assets/microbit/surprised.png',
                        value: 'SURPRISED', width: 48, height: 48, alt: 'surprised'},
                    {src: 'static/extension-assets/microbit/silly.png',
                        value: 'SILLY', width: 48, height: 48, alt: 'silly'},
                    {src: 'static/extension-assets/microbit/fabulous.png',
                        value: 'FABULOUS', width: 48, height: 48, alt: 'fabulous'},
                    {src: 'static/extension-assets/microbit/meh.png',
                        value: 'MEH', width: 48, height: 48, alt: 'meh'},
                    {src: 'static/extension-assets/microbit/tshirt.png',
                        value: 'TSHIRT', width: 48, height: 48, alt: 'tshirt'},
                    {src: 'static/extension-assets/microbit/rollerskate.png',
                        value: 'ROLLERSKATE', width: 48, height: 48, alt: 'rollerskate'},
                    {src: 'static/extension-assets/microbit/duck.png',
                        value: 'DUCK', width: 48, height: 48, alt: 'duck'},
                    {src: 'static/extension-assets/microbit/house.png',
                        value: 'HOUSE', width: 48, height: 48, alt: 'house'},
                    {src: 'static/extension-assets/microbit/tortoise.png',
                        value: 'TORTOISE', width: 48, height: 48, alt: 'tortoise'},
                    {src: 'static/extension-assets/microbit/butterfly.png',
                        value: 'BUTTERFLY', width: 48, height: 48, alt: 'butterfly'},
                    {src: 'static/extension-assets/microbit/stickfigure.png',
                        value: 'STICKFIGURE', width: 48, height: 48, alt: 'stickfigure'},
                    {src: 'static/extension-assets/microbit/ghost.png',
                        value: 'GHOST', width: 48, height: 48, alt: 'ghost'},
                    {src: 'static/extension-assets/microbit/sword.png',
                        value: 'SWORD', width: 48, height: 48, alt: 'sword'},
                    {src: 'static/extension-assets/microbit/giraffe.png',
                        value: 'GIRAFFE', width: 48, height: 48, alt: 'giraffe'},
                    {src: 'static/extension-assets/microbit/skull.png',
                        value: 'SKULL', width: 48, height: 48, alt: 'skull'},
                    {src: 'static/extension-assets/microbit/umbrella.png',
                        value: 'UMBRELLA', width: 48, height: 48, alt: 'umbrella'},
                    {src: 'static/extension-assets/microbit/snake.png',
                        value: 'SNAKE', width: 48, height: 48, alt: 'snake'},
                    {src: 'static/extension-assets/microbit/rabbit.png',
                        value: 'RABBIT', width: 48, height: 48, alt: 'rabbit'},
                    {src: 'static/extension-assets/microbit/cow.png',
                        value: 'COW', width: 48, height: 48, alt: 'cow'},
                    {src: 'static/extension-assets/microbit/quarternote.png',
                        value: 'QUARTERNOTE', width: 48, height: 48, alt: 'quarternote'},
                    {src: 'static/extension-assets/microbit/eigthnote.png',
                        value: 'EIGHTNOTE', width: 48, height: 48, alt: 'eigthnote'},
                    {src: 'static/extension-assets/microbit/pitchfork.png',
                        value: 'PITCHFORK', width: 48, height: 48, alt: 'pitchfork'},
                    {src: 'static/extension-assets/microbit/target.png',
                        value: 'TARGET', width: 48, height: 48, alt: 'target'},
                    {src: 'static/extension-assets/microbit/triangle.png',
                        value: 'TRIANGLE', width: 48, height: 48, alt: 'triangle'},
                    {src: 'static/extension-assets/microbit/lefttriangle.png',
                        value: 'LEFTTRIANGLE', width: 48, height: 48, alt: 'lefttriangle'},
                    {src: 'static/extension-assets/microbit/chessboard.png',
                        value: 'CHESSBOARD', width: 48, height: 48, alt: 'chessboard'},
                    {src: 'static/extension-assets/microbit/diamond.png',
                        value: 'DIAMOND', width: 48, height: 48, alt: 'diamond'},
                    {src: 'static/extension-assets/microbit/smalldiamond.png',
                        value: 'DIAMOND_SMALL', width: 48, height: 48, alt: 'smalldiamond'},
                    {src: 'static/extension-assets/microbit/square.png',
                        value: 'SQUARE', width: 48, height: 48, alt: 'square'},
                    {src: 'static/extension-assets/microbit/smallsquare.png',
                        value: 'SQUARE_SMALL', width: 48, height: 48, alt: 'smallsquare'},
                    {src: 'static/extension-assets/microbit/scissors.png',
                        value: 'SCISSORS', width: 48, height: 48, alt: 'scissors'}
                ],
				noteMenu: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3','B3',
                    'C4', 'D4', 'E4', 'F4', 'G4', 'A4','B4',
                    'C5', 'D5', 'E5', 'F5', 'G5', 'A5','B5'],
				durationMenu: ['全', '二', '四', '八', '十六'],
                musicMenu: ['DADADADUM', 'ENTERTAINER', 'PRELUDE', 'ODE', 'NYAN', 'RINGTONE',
                    'FUNK', 'BLUES', 'BIRTHDAY', 'WEDDING', 'FUNERAL', 'PUNCHLINE', 'PYTHON',
                    'BADDY', 'CHASE', 'BA_DING', 'WAWAWAWAA', 'JUMP_UP', 'JUMP_DOWN', 'POWER_UP', 'POWER_DOWN'],
                accMenu: ['x', 'y', 'z'],
                onoffMenu: ['on', 'off'],
                buttonMenu: ['A', 'B', 'A+B'],
                bitPins: ['P0', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8',
                    'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P19', 'P20'],
                bitPull: [
                    {
                        text: formatMessage({
                            id: 'dailyCode.no_pull',
                            default: 'No Pull'
                        }),
                        value: '0'
                    },
                    {
                        text: formatMessage({
                            id: 'dailyCode.pull_up',
                            default: 'Pull Up'
                        }),
                        value: '3'
                    },
                    {
                        text: formatMessage({
                            id: 'dailyCode.pull_down',
                            default: 'Pull Down'
                        }),
                        value: '1'
                    }],
                gestureMenu: ['up', 'down', 'left', 'right', 'face up', 'face down', 'freefall', '3g', '6g', '8g', 'shake'],
                sideMenu: ['左','右','左+右'],
                directionMenu: ['左','右'],
                servoindex: ['1','2','3','4','5','6'],
                servoSpeed: ['1','2','3','4','5'],
                lineFollowerColor: ['黑','其他'],
				fourRoadLineFollowerIndex: ['1','2','3','4'],
                color: ['红','橙','黄','绿','青','蓝','紫','白','黑'],
            }
        };
    }

    noop (){
    }

	reset(){
		const nanocode = `reset()\r\n`;
        this.write(nanocode);
	}

    showledmat (args, util){
		if(!waiting){
			const nanocode = `display.show(Image("${args.ICON}"))\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }

    showicon (args, util){
		if(!waiting){
			const nanocode = `display.show(Image.${args.ICON})\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }

    showstring (args,util){
		if(!waiting){
			const nanocode = `display.scroll("${args.STR}")\r\n`;
			this.write(nanocode);
		}
        this.wait(args.STR.length*800,util);
    }

    temperature (args){
    	const nanocode = `print("M8 ", temperature())\r\n`;
        return this.report(nanocode, null, 'M8').then(ret => this.parseCmd(ret));
    }
    
    read_light_level (args){
    	const nanocode = `print("M9 ", display.read_light_level())\r\n`;
        return this.report(nanocode, null, 'M9').then(ret => this.parseCmd(ret));
    }

    digiwrite (args){
        const pin = args.PIN.substring(1);
        const nanocode = `pin${pin}.write_digital(${args.LEVEL})\r\n`;
        this.write(nanocode);
    }

    digiread (args){
        const pin = args.PIN.substring(1);
        const nanocode = `print("M1 ", pin${pin}.read_digital())\r\n`;
        return this.report(nanocode, null, 'M1').then(ret => this.parseCmd(ret));
    }

    pinpull (args){
        const pin = args.PIN.substring(1);
        const nanocode = `pin${pin}.set_pull(${args.PULL})\r\n`;
        this.write(nanocode);
    }

    analogwrite (args){
        const pin = args.PIN.substring(1);
        const nanocode = `pin${pin}.write_analog(${args.VALUE})\r\n`;
        this.write(nanocode);
    }

    analogread (args){
        const pin = args.PIN.substring(1);
        const nanocode = `print("M2 ", pin${pin}.read_analog())\r\n`;
        return this.report(nanocode, null, 'M2').then(ret => this.parseCmd(ret));
    }

    musicplay (args,util){
		if(!waiting){
			const nanocode = `music.play(music.${args.MUSIC})\r\n`;
			this.write(nanocode);
		}
        this.wait(2000,util);
    }

	noteplay (args, util){
		if(!waiting){
			const nanocode = `music.play([\'${args.NOTE}:${noteMap[args.DURATION]}\'])\r\n`;
			this.write(nanocode);
		}
		this.wait(noteMap[args.DURATION]*125,util);
    }

    musicpitch (args,util){
		if(!waiting){
			const nanocode = `music.pitch(${args.FREQ}, ${args.LEN})\r\n`;
			this.write(nanocode);
		}
        this.wait(args.LEN,util);
    }

    speech (args,util){
		if(!waiting){
			const nanocode = `speech.say("${args.TXT}", speed=70, pitch=10, throat=190, mouth=190)\r\n`;
			this.write(nanocode);
		}
        this.wait(args.TXT.length*100,util);
    }

    button (args){
        let btn = args.BUTTON;
        btn = btn.toLowerCase();
        let nanocode = `print("M3 ", button_${btn}.is_pressed())\r\n`;
        if (btn === 'a+b'){
            nanocode = `print("M3 ", button_a.is_pressed() and button_b.is_pressed())\r\n`;
        }
        return this.report(nanocode, null, 'M3').then(ret => this.parseCmd(ret));
    }

    accelerometer (args){
        const nanocode = `print("M4 ", accelerometer.get_${args.DIRECTION}())\r\n`;
        return this.report(nanocode, null, 'M4').then(ret => this.parseCmd(ret));
    }

    isgesture (args){
//    	重复6次以保证获取正确
        const nanocode = `print("M5 ", accelerometer.is_gesture("${args.GESTURE}"))\r\n`;
        return this.report(nanocode, null, 'M5').then(
        		ret => this.report(nanocode, null, 'M5').then(
        				ret => this.report(nanocode, null, 'M5').then(
        						ret => this.report(nanocode, null, 'M5').then(
        								ret => this.report(nanocode, null, 'M5').then(
        										ret => this.report(nanocode, null, 'M5').then(
        												ret => this.report(nanocode, null, 'M5').then(
        									        			ret => this.parseCmd(ret)
        									        		)
        							        		)
        					        		)
        			        		)
        	        		)
        		)
        );
    }
    
    calibrate (args){
        const nanocode = `compass.calibrate()\r\n`;
        this.write(nanocode);
    }
    
    heading (args){
        const nanocode = `print("MA ", compass.heading())\r\n`;
        return this.report(nanocode, null, 'MA').then(ret => this.parseCmd(ret));
    }
    
    get_field_strength (args){
        const nanocode = `print("MB ", compass.get_field_strength())\r\n`;
        return this.report(nanocode, null, 'MB').then(ret => this.parseCmd(ret));
    }

    radioswitch (args,util){
		if(!waiting){
			const nanocode = `radio.${args.SWITCH}()\r\n`;
			this.write(nanocode);
		}
        this.wait(100,util);
    }

    radiochannel (args,util){
		if(!waiting){
			const nanocode = `radio.config(channel=${args.CHANNEL})\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }

    radiosend (args,util){
		if(!waiting){
			const nanocode = `radio.send("${args.TEXT}")\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }

    radioreceive (args){
        const nanocode = `print("M6 ", radio.receive())\r\n`;
        return this.report(nanocode, null, 'M6').then(ret => this.parseCmd(ret));
    }
    
    print (args){
        const nanocode = `print("${args.TEXT}")\r\n`;
        this.write(nanocode);
    }

    printvalue (args){
        let txt = args.TEXT;
        if (!isNumber(txt)){
            txt = txt.replace(/\"/g, '');
        }

        const nanocode = `print('${txt}=','${args.VALUE}')\r\n`;
        this.write(nanocode);
    }
    
    motorRun (args,util){
		if(!waiting){
			let speed = args.SPEED*-1;
			//if(speed<-127){
				//speed = -127;
			//}
			//if(speed>127){
				//speed = 127;
			//}
			//限速80
			if(speed<-80){
				speed = -80;
			}
			if(speed>80){
				speed = 80;
			}
			if(speed<0){
				speed = 256+speed;
			}
			
			if(args.SIDE=='左'){
				leftSpeed = speed;
				this.write('motorRun('+rightSpeed+','+speed+')\r\n');
			}else if(args.SIDE=='右'){
				rightSpeed = speed;
				this.write('motorRun('+speed+','+leftSpeed+')\r\n');
			}else if(args.SIDE=='左+右'){
				rightSpeed = speed;
				leftSpeed = speed;
				this.write('motorRun('+speed+','+speed+')\r\n');
			}
		}
		this.wait(50,util);
    	
    }
    
    motorStop (args,util){
		if(!waiting){
			if(args.SIDE=='左'){
				leftSpeed = 0;
				this.write('motorRun('+rightSpeed+',0)\r\n');
			}else if(args.SIDE=='右'){
				rightSpeed = 0;
				this.write('motorRun(0,'+leftSpeed+')\r\n');
			}else if(args.SIDE=='左+右'){
				rightSpeed = 0;
				leftSpeed = 0;
				this.write('motorRun(0, 0)\r\n');
			}
		}
		this.wait(50,util);
    }
    
    motorRunDelay (args){
    	if(args.SIDE=='左'){
    		leftSpeed = 0;
        	const nanocode = `motorRunDelay('left',${args.SECOND*1000}, ${rightSpeed})\r\n`;
    		console.log(nanocode);
        	this.write(nanocode);
    	}else if(args.SIDE=='右'){
    		rightSpeed = 0;
    		const nanocode = `motorRunDelay('right',${args.SECOND*1000}, ${leftSpeed})\r\n`;
    		console.log(nanocode);
        	this.write(nanocode);
    	}else if(args.SIDE=='左+右'){
    		rightSpeed = 0;
        	leftSpeed = 0;
        	const nanocode = `motorRunDelay('left+right',${args.SECOND*1000}, 0)\r\n`;
        	this.write(nanocode);
    	}
    }
    
    getMotorSpeed (args){
    	if(args.SIDE=='左'){
    		if(leftSpeed>128){
    			return 256-leftSpeed;
    		}
    		return leftSpeed;
    	}else if(args.SIDE=='右'){
    		if(rightSpeed>128){
    			return 256-rightSpeed;
    		}
    		return rightSpeed;
    	}else if(args.SIDE=='左+右'){
    		if(leftSpeed==rightSpeed){
    			if(leftSpeed>128){
        			return 256-leftSpeed;
        		}
        		return leftSpeed;
    		}else{
    			return "错误，左右速度不一致";
    		}
    	}
    }
    
    servoMove (args,util){
		if(!waiting){
			let angle = 90 - args.ANGLE
			if(angle<20){
				angle = 20;
			}
			if(angle>160){
				angle = 160;
			}
			
			if(args.SERVOINDEX==1){
				if(args.ANGLE>70){
					servo1Angle = 70;
				}else if(args.ANGLE<-70){
					servo1Angle = -70;
				}else{
					servo1Angle = args.ANGLE;
				}
			}else if(args.SERVOINDEX==2){
				if(args.ANGLE>70){
					servo2Angle = 70;
				}else if(args.ANGLE<-70){
					servo2Angle = -70;
				}else{
					servo2Angle = args.ANGLE;
				}
			}else if(args.SERVOINDEX==3){
				if(args.ANGLE>70){
					servo3Angle = 70;
				}else if(args.ANGLE<-70){
					servo3Angle = -70;
				}else{
					servo3Angle = args.ANGLE;
				}
			}else if(args.SERVOINDEX==4){
				if(args.ANGLE>70){
					servo4Angle = 70;
				}else if(args.ANGLE<-70){
					servo4Angle = -70;
				}else{
					servo4Angle = args.ANGLE;
				}
			}else if(args.SERVOINDEX==5){
				if(args.ANGLE>70){
					servo5Angle = 70;
				}else if(args.ANGLE<-70){
					servo5Angle = -70;
				}else{
					servo5Angle = args.ANGLE;
				}
			}else if(args.SERVOINDEX==6){
				if(args.ANGLE>70){
					servo6Angle = 70;
				}else if(args.ANGLE<-70){
					servo6Angle = -70;
				}else{
					servo6Angle = args.ANGLE;
				}
			}
			const nanocode = `servoMove(${args.SERVOINDEX},${this.mapRGB(angle,0,180,500,2500)}, ${servoSpeed})\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }
    
    servoSpeed (args,util){
		if(!waiting){
			if(args.SPEED==1){
				servoSpeed = 1500;
			}else if(args.SPEED==2){
				servoSpeed = 1200;
			}else if(args.SPEED==3){
				servoSpeed = 900;
			}else if(args.SPEED==4){
				servoSpeed = 600;
			}else if(args.SPEED==5){
				servoSpeed = 300;
			}else{
				servoSpeed = 900;
			}
		}
		this.wait(50,util);
    }
    
    servoAngle (args,util){
		if(!waiting){
			if(args.SERVOINDEX==1){
				return servo1Angle;
			}else if(args.SERVOINDEX==2){
				return servo2Angle;
			}else if(args.SERVOINDEX==3){
				return servo3Angle;
			}else if(args.SERVOINDEX==4){
				return servo4Angle;
			}else if(args.SERVOINDEX==5){
				return servo5Angle;
			}else if(args.SERVOINDEX==6){
				return servo6Angle;
			}else{
				return "错误，不存在的编号";
			}
		}
		this.wait(50,util);
    }
    
    sonic (args){
        const nanocode = `print("MC ", sonic(2))\r\n`;
        return this.report(nanocode, null, 'MC').then(ret => this.parseCmd(ret));
    }
    
    lineFollowerSensor (args){
        const nanocode = `print("MD ", lineFollowerSensor(1, ${args.SIDE=='左'?1:2}))\r\n`;
        return this.report(nanocode, null, 'MD').then(ret => this.parseCmd(ret));
    }    
    
    lineFollower (args){
        const nanocode = `print("MD ", lineFollowerSensor(1, ${args.SIDE=='左'?1:2}))\r\n`;
        return this.report(nanocode, null, 'MD').then(ret => {
        	let value = this.parseCmd(ret)
        	if(args.COLOR=="白"){
            	if(value<parseInt(args.VALUE)){
                	return true
            	}else{
                	return false
            	}
            }else{
            	if(value<parseInt(args.VALUE)){
                	return false
            	}else{
                	return true
            	}
            }
        });
    }
    
    getVolume (args){
        const nanocode = `print("MD ", uartRead())\r\n`;
        return this.report(nanocode, null, 'MD').then(ret => this.parseCmd(ret));
    }
    
    battery (args){
        const nanocode = `print("ME ", uartRead())\r\n`;
        return this.report(nanocode, null, 'ME').then(ret => this.parseCmd(ret));
    }
    
    rgbLed (args,util){
		if(!waiting){
			let side = '';
			if(args.SIDE=='左'){
				side = 'left'
			}else if(args.SIDE=='右'){
				side = 'right'
			}else if(args.SIDE=='左+右'){
				side = 'left+right'
			}
			let r = 0;
			let g = 0;
			let b = 0;
			if(args.COLOR=='红'){
				r = 255;
			}else if(args.COLOR=='橙'){
				r = 255;
				g = 100;
			}else if(args.COLOR=='黄'){
				r = 255;
				g = 255;
			}else if(args.COLOR=='绿'){
				g = 255;
			}else if(args.COLOR=='青'){
				g = 255;
				b = 255;
			}else if(args.COLOR=='蓝'){
				b = 255;
			}else if(args.COLOR=='紫'){
				r = 255;
				b = 255;
			}else if(args.COLOR=='白'){
				r = 255;
				g = 255;
				b = 255;
			}
			const nanocode = `rgbLed(${r}, ${g}, ${b}, '${side}')\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }
    
    rgbLedValue (args,util){
		if(!waiting){
			let side = '';
			if(args.SIDE=='左'){
				side = 'left'
			}else if(args.SIDE=='右'){
				side = 'right'
			}else if(args.SIDE=='左+右'){
				side = 'left+right'
			}
			const nanocode = `rgbLed(${args.R}, ${args.G}, ${args.B}, '${side}')\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }
    
    rgbLedClose (args,util){
		if(!waiting){
			let side = '';
			if(args.SIDE=='左'){
				side = 'left'
			}else if(args.SIDE=='右'){
				side = 'right'
			}else if(args.SIDE=='左+右'){
				side = 'left+right'
			}
			const nanocode = `rgbLed(0, 0, 0, '${side}')\r\n`;
			this.write(nanocode);
		}
		this.wait(50,util);
    }
    
    strToHex(args){
    	let re = /[\u4E00-\u9FA5]/;
		let ar = [];
    	let str = args.STR;
    	for (let i = 0; i < str.length; i++) {
			let a = ''
			if (re.test(str.charAt(i))) { // 中文
		        a = encodeURI(str.charAt(i)).replace(/%/g, '');
		    } else {
		        a = str.charCodeAt(i).toString(16);
		    }
		    ar.push(a);
    	}
    	str = ar.join('');
    	return str;
    }
    
    hexToStr(args){
    	let str = args.HEX;
    	if (str.length % 2 != 0) {
    		return console.log('必须为偶数');
    	}
    	let buf = [];
    	for (let i = 0; i < str.length; i += 2) {
    		buf.push(parseInt(str.substring(i, i + 2), 16));
    	}
    	
    	if (typeof buf === 'string') {
    		return buf;
    	}
    	let UTF = '', _buf = buf;
    	for (let i = 0; i < _buf.length; i++) {
    		let one = _buf[i].toString(2), v = one.match(/^1+?(?=0)/);
    		if (v && one.length == 8) {
    			let bytesLength = v[0].length;
    			let store = _buf[i].toString(2).slice(7 - bytesLength);
    			for (let st = 1; st < bytesLength; st++) {
    				store += _buf[st + i].toString(2).slice(2);
    			}
    			UTF += String.fromCharCode(parseInt(store, 2));
    			i += bytesLength - 1;
    		} else {
    			UTF += String.fromCharCode(_buf[i]);
    		}
    	}
    	return UTF;
    }

	irrec(){
		const nanocode = `print("MF ", irrec())\r\n`;
        return this.report(nanocode, null, 'MF').then(ret => this.parseCmd(ret));
	}

	fourRoadLineFollowerSensor(args){
		const nanocode = `print("MG ", fourRoadLineFollowerSensor(${args.INDEX}, ${args.COLOR=='黑'?1:0}))\r\n`;
		return this.report(nanocode, null, 'MG').then(ret => this.parseCmd(ret));
	}

    parseCmd (msg){
    	console.log(msg);
        let tmp = msg.trim().split(' ');
        tmp = tmp.filter(n => { return n !== ''});
        if (msg.startsWith('M1')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M2')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M3')){
            return tmp[1] === 'True';
        } else if (msg.startsWith('M4')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M5')){
            return tmp[1] === 'True';
        } else if (msg.startsWith('M6')){
            return tmp[1];
        } else if (msg.startsWith('M7')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M8')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M9')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('M10')){
            return null; // motor delay end
        } else if (msg.startsWith('MA')){
            return parseInt(tmp[1], 10);
        } else if (msg.startsWith('MB')){
            return parseInt(parseInt(tmp[1], 10)/1000);
        } else if (msg.startsWith('MC')){
            return parseInt(parseInt(tmp[1], 10)*0.034/2);
        } else if (msg.startsWith('MD')){
//        	index1、2为adc输入，3、4为音量、5、6为电量
            return parseInt(tmp[1].substr(3,2),16);
        } else if (msg.startsWith('ME')){
//        	index1、2为adc输入，3、4为音量、5、6为电量
            return parseInt(tmp[1].substr(5,2),16);
        } else if (msg.startsWith('MF')){
            if(tmp[1]=='59670'){
				return 0;
			}else if(tmp[1]=='62220'){
				return 1;
			}else if(tmp[1]=='59160'){
				return 2;
			}else if(tmp[1]=='41310'){
				return 3
			}else if(tmp[1]=='63240'){
				return 4;
			}else if(tmp[1]=='58140'){
				return 5;
			}else if(tmp[1]=='42330'){
				return 6;
			}else if(tmp[1]=='48450'){
				return 7;
			}else if(tmp[1]=='44370'){
				return 8;
			}else if(tmp[1]=='46410'){
				return 9;
			}else{
				return 10;
			}
        }else if (msg.startsWith('MG')){
            return parseInt(tmp[1], 10) == true;
        }
    }
    
    mapRGB(x, in_min, in_max, out_min, out_max) {
        return parseInt((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
    }
}


module.exports = dailyCode;
