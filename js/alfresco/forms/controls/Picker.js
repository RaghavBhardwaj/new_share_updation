/**
 * Copyright (C) 2005-2013 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @module alfresco/forms/controls/Picker
 * @extends module:alfresco/forms/controls/BaseFormControl
 * @mixes module:alfresco/core/CoreWidgetProcessing
 * @author Dave Draper
 */
define(["alfresco/forms/controls/BaseFormControl",
        "alfresco/core/CoreWidgetProcessing",
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array"], 
        function(BaseFormControl, CoreWidgetProcessing, declare, lang, array) {
   
   return declare([BaseFormControl, CoreWidgetProcessing], {
      
      /**
       * The value to use as a key for each item. Each picked item should have an attribute with the name defined.
       *
       * @instance
       * @type {string}
       * @default "name"
       */
      itemKey: "name",

      /**
       * @instance
       */
      getWidgetConfig: function alfresco_forms_controls_Picker__getWidgetConfig() {
         // Return the configuration for the widget
         return {
            id : this.id + "_CONTROL",
            name: this.name,
            value: (this.value != null) ? this.value : []
         };
      },
      
      /**
       * @instance
       */
      createFormControl: function alfresco_forms_controls_Picker__createFormControl(config, domNode) {
         this.alfSubscribe("ALF_ITEMS_SELECTED", lang.hitch(this, "onItemsSelected"));
         
         // Update the model to set the main picked items display and the overall picker config
         var clonedWidgetsForControl = lang.clone(this.widgetsForControl);
         this.setModelPickedItemsConfig(lang.clone(this.configForPickedItems), config.value, clonedWidgetsForControl);
         this.setModelPickerConfig(lang.clone(this.configForPicker), clonedWidgetsForControl);
         
         // Set the value...
         this.setModelPickerWidgetValue(config.value, clonedWidgetsForControl);
         return this.processWidgets(clonedWidgetsForControl, this.domNode);
      },

      /**
       * Updates the model to set a value of the currently selected items. It is necessary to do this because
       * the model cannot contain variable information (at least none that can be defined when the widget is
       * instantiated) so it is necessary to perform this before the [processWidgets]{@link module:alfresco/core/Core#processWidgets}
       * function is called.
       *
       * @instance
       * @param {object} config The configuration to use
       * @param {array} value The value to set
       * @param {object} widgetsForControl A cloned copy of the defined widgets for the picked items
       */
      setModelPickedItemsConfig: function alfresco_forms_controls_Picker__setModelPickedItemsConfig(config, value, widgetsForControl) {
         lang.setObject("0.config.widgets.0.config", config, widgetsForControl);
         lang.setObject("0.config.widgets.0.config.value", value, widgetsForControl);
      },

      /**
       * Updates the model to set a value of the currently selected items. It is necessary to do this because
       * the model cannot contain variable information (at least none that can be defined when the widget is
       * instantiated) so it is necessary to perform this before the [processWidgets]{@link module:alfresco/core/Core#processWidgets}
       * function is called.
       *
       * @instance
       * @param {object} value The value to set
       */
      setModelPickerConfig: function alfresco_forms_controls_Picker__setModelPickerConfig(value, widgetsForControl) {
         lang.setObject("0.config.widgets.1.config.widgets.0.config", value, widgetsForControl);
      },

      /**
       * The value returned is an array where each element is the value of the [itemKey]{@link module:alfresco/forms/controls/Picker#itemKey}
       * of each item returned by calling the [getPickedItemsWidget function]{@link module:alfresco/forms/controls/Picker#getPickedItemsWidget}. 
       *
       * @instance
       * @returns {object}
       */
      getValue: function alfresco_forms_controls_Picker__getValue() {
         var processedItems = [];
         var items = this.getPickedItemsWidget().currentData.items;
         array.forEach(items, function(item, index) {
            processedItems.push(item[this.itemKey]);
         }, this);
         return processedItems;
      },
      
      /**
       * Calls the [setModelPickerWidgetValue]{@link module:alfresco/forms/controls/DocumentPicker#setModelPickerWidgetValue}
       * function.
       *
       * @instance
       * @param {object} value
       */
      setValue: function alfresco_forms_controls_Picker__setValue(value) {
         this.setModelPickerWidgetValue(value);
      },

      /**
       * Updates the model to set a value of the currently selected items. It is necessary to do this because
       * the model cannot contain variable information (at least none that can be defined when the widget is
       * instantiated) so it is necessary to perform this before the [processWidgets]{@link module:alfresco/core/Core#processWidgets}
       * function is called.
       *
       * @instance
       * @param {object} value The value to set
       */
      setModelPickerWidgetValue: function alfresco_forms_controls_Picker__setModelPickerWidgetValue(value, widgetsForControl) {
         lang.setObject("0.config.widgets.1.config.widgets.0.config.value", value, widgetsForControl);
      },

      /**
       * When items are picked it is necessary to update the [AlfFormDialogButton]{@link module:alfresco/buttons/AlfFormDialogButton} 
       * that generates the [form]{@link module:alfresco/forms/Form} containing the [Picker]{@link module:alfresco/pickers/Picker} because
       * the [AlfDialogService]{@link module:alfresco/dialogs/AlfDialogService} will destroy the dialog when it is closed. 
       *
       * @instance
       * @param {object} value The items to set.
       */
      updateFormDialogButton: function alfresco_forms_controls_Picker__updateFormDialogButton(value) {
         var button = lang.getObject("verticalWidgets.formDialogButton", false, this);
         if (button != null)
         {
            lang.setObject("widgets.0.config.value", value, button);
         }
         else
         {
            this.alfLog("warn", "The button to request a form does not exist", this);
         }
      },

      /**
       * This is called when the [form]{@link module:alfresco/forms/Form} generated by the [AlfFormDialogButton]{@link module:alfresco/buttons/AlfFormDialogButton}
       * is submitted. The payload will contain the picked items captured by the [Picker]{@link module:alfresco/pickers/Picker}
       * widget. The items should then be rendered in the local [PickedItems]{@link module:alfresco/pickers/PickedItems} widget.
       *
       * @instance
       * @param {object} payload The details of the selected items
       */
      onItemsSelected: function alfresco_forms_controls_Picker__onItemsSelected(payload) {
         var pickedItemsWidget = this.getPickedItemsWidget();
         if (pickedItemsWidget != null)
         {
            if (payload.pickedItems != null)
            {
               pickedItemsWidget.currentData.items = payload.pickedItems;
               pickedItemsWidget.renderView();
               this.updateFormDialogButton(payload.pickedItems);
            }
            else
            {
               this.alfLog("warn", "No items provided to assign to PickedItems widget, nothing will be set", payload, this);
            }
            this.validate();
         }
         else
         {
            this.alfLog("warn", "PickedItems widget is not created, it is not possible to set items", this);
         }
      },

      /**
       * Retrieves the [PickedItems widget]{@link module:alfresco/pickers/PickedItems} defined in the 
       * [widgetsForControl]{@link module:alfresco/forms/controls/DocumentPicker#widgetsForControl} model.
       * This is defined in a separate function to support functions that override the model and need to
       * obtain the widget by a different means.
       *
       * @instance
       * @returns {object} The [PickedItems widget]{@link module:alfresco/pickers/PickedItems}
       */
      getPickedItemsWidget: function alfresco_forms_controls_Picker__getPickedItemsWidget() {
         var widget = lang.getObject("verticalWidgets.pickedItemsWidget", false, this);
         return widget;
      },

      /**
       * This should be overridden to define the widget model for rendering the picked items.
       *
       * @instance
       * @type {object}
       * @default []
       */
      configForPickedItems: null,

      /**
       * This should be overridden to define the widget model for rendering the picker that appears within the 
       * dialog.
       *
       * @instance
       * @type {object}
       * @default []
       */
      configForPicker: null,

      /**
       * 
       * @instance
       * @type {object}
       * @default
       */
      widgetsForControl: [
         {
            name: "alfresco/layout/VerticalWidgets",
            assignTo: "verticalWidgets",
            config: {
               widgets: [
                  {
                     name: "alfresco/pickers/PickedItems",
                     assignTo: "pickedItemsWidget"
                  },
                  {
                     name: "alfresco/buttons/AlfFormDialogButton",
                     assignTo: "formDialogButton",
                     config: {
                        label: "Add",
                        dialogTitle: "Select...",
                        dialogConfirmationButtonTitle : "OK",
                        dialogCancellationButtonTitle : "Cancel",
                        formSubmissionTopic: "ALF_ITEMS_SELECTED",
                        formSubmissionGlobal: false,
                        formSubmissionToParent: false,
                        additionalCssClasses: "confirmationButton",
                        widgets: [
                           {
                              name: "alfresco/pickers/Picker",
                              config: {}
                           }
                        ]
                     }
                  },
                  {
                     name: "alfresco/buttons/AlfButton",
                     config: {
                        label: "Remove All",
                        additionalCssClasses: "cancelButton",
                        publishTopic: "ALF_ITEMS_SELECTED",
                        publishPayload: {
                           pickedItems: []
                        }
                     }
                  }
               ]
            }
         }
      ]
   });
});