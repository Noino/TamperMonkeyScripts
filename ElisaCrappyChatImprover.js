// ==UserScript==
// @name         ElisaCrappyChatImprover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Try to make ElisaChat usable
// @author       Noino
// @match        https://cprx40.mob3.elisa.fi/xpad/
// @grant        none
// ==/UserScript==

(function(){
    'use strict';

    var ElisaCrappyChatImprover = function() {
        var observer = new MutationObserver(this.obscb.bind(this));
        observer.observe(document.body, this.obscnf);
        console.log('ElisaCrappyChatImprover:: started');

        this.obscb([]);
    }

    Object.assign(ElisaCrappyChatImprover.prototype, {
        active: false,
        obscnf: { attributes: false, childList: true, subtree: true },
        evtcnf: { bubbles: true, cancelable: true, view: window	},
        obscb: function(mutationsList) {
            var ci = document.getElementById('chatInputArea');
            console.log('ElisaCrappyChatImprover:: checking the need to activate',
                '(active: '+!!this.active+', chat found:'+!!ci+')'
            );
            if (this.active && !ci) {
                this.disable();
            } else if (!this.active && ci) {
                this.enable();
            }
        },
        disable: function() {
            this.active = false;
            console.log('ElisaCrappyChatImprover:: should be off');
            // dont think we need to, but this is where to prevent memleaks if they occur
        },
        enable: function() {
            this.active = true;
            console.log('ElisaCrappyChatImprover:: turning on');
            this.evt = document.getElementById('chatInputArea').addEventListener('keydown', function(ev) {
                if (ev.keyCode == 13 && !ev.shiftKey) {
                    console.log('enter');
                    var e = document.querySelectorAll('#chat-detail-btn-send-im')[0];
                    var evt = new MouseEvent('mousedown', this.evtcnf);
                    e.dispatchEvent(evt);
                    evt = new MouseEvent('click', this.evtcnf);
                    e.dispatchEvent(evt);
                }
            });
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
            console.log('ElisaCrappyChatImprover:: domloaded');
            new ElisaCrappyChatImprover();
        });
    } else {
        console.log('ElisaCrappyChatImprover:: after domloaded');
        new ElisaCrappyChatImprover();
    }
})();
