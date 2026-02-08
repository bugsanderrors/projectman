sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("manishant.projectman.controller.main", {
        onInit() {
            this._iIndex = 0;
            this._aPages = this.byId("imageCarousel").getPages();

            this._carouselTimer = setInterval(function () {
                var oCarousel = this.byId("imageCarousel");

                this._iIndex = (this._iIndex + 1) % this._aPages.length;
                oCarousel.setActivePage(this._aPages[this._iIndex]);

            }.bind(this), 2000); // rotate every 2 seconds

        },

        onExit: function () {
            if (this._carouselTimer) {
                clearInterval(this._carouselTimer);
            }
        },

        _openDialog: function (sFragmentName) {
            var oView = this.getView();
            var that = this;

            if (!this._mDialogs) {
                this._mDialogs = {};
            }

            if (!this._mDialogs[sFragmentName]) {
                this._mDialogs[sFragmentName] = sap.ui.core.Fragment.load({
                    id: oView.getId(),
                    name: "manishant.projectman.view." + sFragmentName,
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._mDialogs[sFragmentName].then(function (oDialog) {                
                oDialog.open();
            });
        },

        onYes: function () {

            var sChoice = this.getOwnerComponent()
                              .getModel("global")
                              .getProperty("/userChoice");
            
            if (sChoice === "NO") {
                this._openDialog("yesPopInit");
            }
            else {
                //this._playAudio("hey_ya");
                this._playAudio("dooron");
                this._openDialog("intro");
                //this.createFloatingHearts();
            }

        },

        onYes1 : function () {
            this.byId("noPop").close();
            this._playAudio("make_you_mine");
            this._openDialog("noPop2");
        },

        onNo: function () {

            this.getOwnerComponent()
                .getModel("global")
                .setProperty("/userChoice", "NO");

            this._openDialog("noPop");
        },

        onCloseYes : function () {
            this._pauseAudio();
            this.byId("yesPop").close();
            this._playAudio("all_I_can_say");
            this._openDialog("letter");
        },

        onCloseIntro : function () {
            this._pauseAudio();
            if (this._heartInterval) {
                clearInterval(this._heartInterval);
                this._heartInterval = null;
            }

            this.byId("intro").close();
            this._playAudio("hey_ya");
            this._openDialog("yesPop1");
        },

        onCloseInitYes : function () {
            this.byId("yesInitPop").close();
            //this._playAudio("hey_ya");
            this._openDialog("intro");
        },

        onCloseYes1 : function () {
            this._pauseAudio();
            this.byId("yesPop1").close();
            this._playAudio("until_I_found_you");
            this._openDialog("yesPop2");
        },

        onCloseYes2 : function () {
            this._pauseAudio();
            this.byId("yesPop2").close();
            this._playAudio("perfect");
            this._openDialog("yesPop3");
        },

        onCloseYes3 : function () {
            this._pauseAudio();
            this.byId("yesPop3").close();
            this._playAudio("tum_se_hi");
            this._openDialog("yesPop5");
        },

        onCloseYes4 : function () {
            this.byId("yesPop4").close();
            this._openDialog("yesPop5");
        },

        onCloseYes5 : function () {
            this._pauseAudio();
            this.byId("yesPop5").close();
            this._playAudio("raataan_lambiyan");
            this._openDialog("yesPop");
        },

        onCloseNo : function () {
            this.byId("noPop").close();
        },

        onCloseNo2 : function () {
            this._pauseAudio();
            this.byId("noPop2").close();
        },

        onCloseLetter : function () {
            this._pauseAudio();
            this.byId("letter").close();
        },

        _playAudio : function(sSongName) {
            //if (!this._audio) {
            this._audio = new Audio(
                sap.ui.require.toUrl("manishant/projectman/audio/" + sSongName + ".mp3")
            );
            this._audio.loop = true;
                
            //}
            this._audio.play();
        },

        _pauseAudio : function() {
            if (this._audio) {
                this._audio.pause();
                this._audio.currentTime = 0;
            }
        }


    });
});