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
 * Handles requests to redirect the browser to display different pages in either current or the new tab.
 * 
 * @module alfresco/services/NavigationService
 * @extends module:alfresco/core/Core
 * @mixes module:alfresco/services/_NavigationServiceTopicMixin
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/core/Core",
        "alfresco/services/_NavigationServiceTopicMixin",
        "dojo/hash",
        "dojo/_base/array",
        "dojo/_base/lang",
        "service/constants/Default"],
        function(declare, AlfCore, _NavigationServiceTopicMixin, hash, array, lang, AlfConstants) {
   
   return declare([AlfCore, _NavigationServiceTopicMixin], {
      
      /**
       * It is possible to configure the NavigationService to respond to one or more publications that result in page navigation.
       * This is the attribute that will be set to respond to those publications.
       * 
       * @instance
       * @type {object[]}
       * @default null
       */
      subscriptions: null,
      
      /**
       * Sets up the subscriptions for the NavigationService. The [navigateToPageTopic]{@link module:alfresco/services/_NavigationServiceTopicMixin#navigateToPageTopic}
       * topic is handled by the [navigateToPage]{@link module:alfresco/services/NavigationService#navigateToPage} function and the
       * [reloadPageTopic]{@link module:alfresco/services/_NavigationServiceTopicMixin#reloadPageTopic} is handled by the
       * [reloadPage]{@link module:alfresco/services/NavigationService#reloadPage} function.
       * 
       * @instance
       * @param {array} args Constructor arguments
       */
      constructor: function alfresco_services_NavigationService__constructor(args) {
         lang.mixin(this, args);
         
         this.alfSubscribe(this.navigateToPageTopic, lang.hitch(this, "navigateToPage"));
         this.alfSubscribe(this.reloadPageTopic, lang.hitch(this, "reloadPage"));
         
         if (this.subscriptions != null)
         {
            array.forEach(this.subscriptions, lang.hitch(this, "setupNavigationSubscriptions"));
         }
      },
      
      /**
       * Sets up a subscription to handle publications that occur on the page that should trigger navigation.
       *
       * @instance
       * @param {object} subscription The subscription to configure
       * @param {number} index The index of the subscription
       */
      setupNavigationSubscriptions: function alfresco_services_NavigationService__setupNavigationSubscriptions(subscription, index) {
         if (subscription != null &&
             subscription.topic != null &&
             subscription.url != null)
         {
            this.alfSubscribe(subscription.topic, lang.hitch(this, "navigateToPage", subscription));
         }
         else
         {
            this.alfLog("warn", "A NavigationService subscription was requested, but the subscription was missing one of the required attributes of 'topic' or 'url'", subscription, this);
         }
      },
      
      /**
       * This is the default page navigation handler. It is called when the service receives a publication on 
       * the [navigateToPageTopic]{@link module:alfresco/services/_NavigationServiceTopicMixin#navigateToPageTopic} topic. At the moment 
       * it makes the assumption that the URL data will be relative to the Share page context.
       * 
       * @instance
       * @param {object} data An object containing the information about the page to navigate to.
       */
      navigateToPage: function alfresco_services_NavigationService__navigateToPage(data) {
         if (!data.type == this.hashPath && (typeof data.url == "undefined" || data.url == null || data.url == ""))
         {
            this.alfLog("error", "A page navigation request was made without a target URL defined as a 'url' attribute", data);
         }
         else
         {
            this.alfLog("log", "Page navigation request received:", data);
            var url;
            if (typeof data.type == "undefined" ||
                data.type == null ||
                data.type == "" ||
                data.type == this.sharePageRelativePath)
            {
               url = AlfConstants.URL_PAGECONTEXT + data.url;
            }
            else if (data.type == this.contextRelativePath)
            {
               url = Alfresco.contants.URL_CONTEXT + data.url;
            }
            else if (data.type == this.fullPath)
            {
               url = data.url;
            }
            
            // Determine the location of the URL...
            if (data.type == this.hashPath)
            {
               hash(data.url);
            }
            else if (typeof data.target == "undefined" ||
                data.target == null ||
                data.target == "" ||
                data.target == this.currentTarget)
            {
               window.location = url;
            }
            else if (data.target == this.newTarget)
            {
               window.open(url);
            }
         }
      },
      
      /**
       * Reloads the current page. Despite the simplicity of the action, page refreshes should still be handled over the
       * pub/sub layer as this provides an opportunity for additional logging and other actions required by third party
       * extensions.
       * 
       * @instance
       * @param {object} data An object containing additional information. NOTE: Currently, no additional data is processed
       */
      reloadPage: function alfresco_services_NavigationService__reloadPage(data) {
         this.alfLog("log", "Page reload request received:", data);
         window.location.reload(true);
      }
   });
});