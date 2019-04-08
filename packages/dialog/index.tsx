import Vue from 'vue'
// import { Component } from 'vue/types'
import VueDialog from './Dialog.vue'

export interface DialogOptions {
	container?: string
}

let instance: Vue

const Dialog = (options: DialogOptions) => new Promise((resolve, reject) => {
	if (!instance) {
		const DialogConstructor = Vue.extend(VueDialog)
		instance = new DialogConstructor({
			el: document.createElement('div')
		})
	}

	// let containerElem
	// if (options.container) {
	// 	containerElem = document.querySelector(options.container)
	// }
	// if (!containerElem) {
	// 	containerElem = document.body
	// }
	// containerElem.appendChild(instance.$el)

	Object.assign(instance, options, {
		resolve,
		reject
	})
})

Dialog.alert = Dialog

export default Dialog

