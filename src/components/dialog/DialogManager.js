// @flow

import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import HopThoai from './DialogView'
import DialogLoading from './DialogLoading'
import { STATUS } from '../../model/Object';

const DESTROY_TIMEOUT = 1;

class DialogManager {

    constructor() {
        this.dialogs = [];
    }


    static get STATUSLOADING() {
        return this._STATUSLOADING;
    }

    static set STATUSLOADING(value) {
        this._STATUSLOADING = value;
    }

    get currentDialog() {
        return this.dialogs[this.dialogs.length - 1];
    }



    add(props, callback) {
        const dialog = new RootSiblings(
            <HopThoai {...props} />,
            callback,
        );
        this.dialogs.push(dialog);
    }

    destroy() {
        STATUS.POPUP_STATUS = false;
        const dialog = this.dialogs.pop();
        setTimeout(() => {
            if (dialog)
                dialog.destroy();
        }, DESTROY_TIMEOUT);
    }


    show = (props, callback) => {
        if (!STATUS.POPUP_STATUS) {
            STATUS.POPUP_STATUS = true;
            this.add({
                ...props,
                show: true,
            }, callback);
        }
    }

    dismissAll = (callback) => {
        this.dialogs.forEach(() => {
            this.dismiss(callback);
        });
    }

    dismiss = () => {
        this.destroy()
    }

    showPopupTwoButton(txtContent, title = "", callback, dismissOnTouchOutside, label1, label2) {
        console.log("showPopupTwoButton");
        this.show(
            {
                title: title,
                one: false,
                content: txtContent,
                callback: callback,
                dismiss: this.dismiss,
                dismissOnTouchOutside: dismissOnTouchOutside,
                label1, label2
            }, () => {

            });
    }



    showPopupOneButton(txtContent, title = "", callback, dismissOnTouchOutside, label1, label2) {
        console.log("showPopupOneButton");
        this.show({
            title: title,
            one: true,
            content: txtContent,
            callback: callback,
            dismiss: this.dismiss,
            dismissOnTouchOutside: dismissOnTouchOutside,
            label1, label2
        }, () => {

        });
    }



<<<<<<< HEAD
    showLoading() {
        this.hiddenLoading()
=======
    showLoading() {        
        if (this.dialogLoading) return
>>>>>>> 563edb33a2e0d11cf2fd5496f25f218aa729e163
        DialogManager.STATUSLOADING = true;
        this.dialogLoading = new RootSiblings(
            <DialogLoading></DialogLoading>);
    }
    hiddenLoading() {
        if (this.dialogLoading) {
            this.dialogLoading.destroy();
        }
    }
}

DialogManager.STATUSLOADING = false;


export default DialogManager;

