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
 * This should be used to wrap a set of [AlfDocumentFilters]{@link module:alfresco/documentlibrary/AlfDocumentFilter} 
 * in order to achieve the "twisty" and correct look and feel as expected in a document library.
 * 
 * @module alfresco/layout/Twister
 * @extends dijit/_WidgetBase
 * @mixes dijit/_TemplatedMixin
 * @mixes module:alfresco/core/Core
 * @mixes module:alfresco/core/CoreWidgetProcessing
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/Twister.html",
        "alfresco/core/Core",
        "alfresco/core/CoreWidgetProcessing",
        "dojo/_base/lang",
        "dojo/_base/array"], 
        function(declare, _WidgetBase, _TemplatedMixin, template,  AlfCore, CoreWidgetProcessing, lang, array) {
   return declare([_WidgetBase, _TemplatedMixin, AlfCore, CoreWidgetProcessing], {
      
      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance cssRequirements {Array}
       * @type {object[]}
       * @default [{cssFile:"./css/Twister.css"}]
       */
      cssRequirements: [{cssFile:"./css/Twister.css"}],
      
      /**
       * The HTML template to use for the widget.
       * @instance
       * @type {String}
       */
      templateString: template,
      
      /**
       * @instance
       */
      postMixInProperties: function() {
         if (this.label != null)
         {
            this.label = this.encodeHTML(this.message(this.label));
         }
      },
      
      /**
       * Processes any widgets defined in the configuration for this instance.
       * 
       * @instance
       */
      postCreate: function alfresco_layout_Twister__postCreate() {
         if (this.label != null && this.label != "")
         {
            Alfresco.util.createTwister(this.labelNode, this.filterPrefsName);
         }
         
         if (this.widgets)
         {
            this.processWidgets(this.widgets);
         }
      },
      
      /**
       * Iterates over the processed widgets and adds each one to the content node.
       * 
       * @instance
       * @param {object[]} widgets The widgets that were created.
       */
      allWidgetsProcessed: function alfresco_layout_Twister__allWidgetsProcessed(widgets) {
         array.forEach(widgets, lang.hitch(this, function(widget, index) {
            widget.placeAt(this.contentNode);
         }), this);
      }
   });
});