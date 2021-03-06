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
 * Extends the default [AlfDocumentList]{@link module:alfresco/documentlibrary/AlfDocumentList} to 
 * make search specific requests.
 * 
 * @module alfresco/documentlibrary/AlfSearchList
 * @extends alfresco/documentlibrary/AlfDocumentList
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "alfresco/documentlibrary/AlfDocumentList", 
        "alfresco/core/PathUtils",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/hash",
        "dojo/io-query",
        "alfresco/core/ArrayUtils"], 
        function(declare, AlfDocumentList, PathUtils, array, lang, domConstruct, domClass, hash, ioQuery, arrayUtils) {
   
   return declare([AlfDocumentList], {
      
      /**
       * An array of the i18n files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{i18nFile: "./i18n/AlfDocumentList.properties"}]
       */
      i18nRequirements: [{i18nFile: "./i18n/AlfSearchList.properties"}],

      /**
       * An array of the CSS files to use with this widget.
       * 
       * @instance
       * @type {object[]}
       * @default [{cssFile:"./css/AlfSearchList.css"}]
       */
      cssRequirements: [{cssFile:"./css/AlfSearchList.css"}],
      
      /**
       * Subscribe the document list topics.
       * 
       * @instance
       */
      postMixInProperties: function alfresco_documentlibrary_AlfSearchList__postMixInProperties() {
         
         this.alfSubscribe("ALF_DOCLIST_SORT", lang.hitch(this, "onSortRequest"));
         this.alfSubscribe("ALF_DOCLIST_SORT_FIELD_SELECTION", lang.hitch(this, "onSortFieldSelection"));
         
         // Subscribe to the topics that will be published on by the DocumentService when retrieving documents
         // that this widget requests...
         this.alfSubscribe("ALF_RETRIEVE_DOCUMENTS_REQUEST_SUCCESS", lang.hitch(this, "onSearchLoadSuccess"));
         this.alfSubscribe("ALF_RETRIEVE_DOCUMENTS_REQUEST_FAILURE", lang.hitch(this, "onDataLoadFailure"));

         // Subscribe to the topics that address specific search updates...
         this.alfSubscribe("ALF_SET_SEARCH_TERM", lang.hitch(this, "onSearchTermRequest"));
         this.alfSubscribe("ALF_INCLUDE_FACET", lang.hitch(this, "onIncludeFacetRequest"));
         this.alfSubscribe("ALF_APPLY_FACET_FILTER", lang.hitch(this, "onApplyFacetFilter"));
         this.alfSubscribe("ALF_REMOVE_FACET_FILTER", lang.hitch(this, "onRemoveFacetFilter"));
         this.alfSubscribe("ALF_SEARCHLIST_SCOPE_SELECTION", lang.hitch(this, "onScopeSelection"));
         this.alfSubscribe(this.reloadDataTopic, lang.hitch(this, this.reloadData));

         // Infinite scroll handling
         this.alfSubscribe(this.scrollNearBottom, lang.hitch(this, "onScrollNearBottom"));

         // Listen for updates on request processing...
         this.alfSubscribe(this.requestInProgressTopic, lang.hitch(this, "onRequestInProgress"));
         this.alfSubscribe(this.requestFinishedTopic, lang.hitch(this, "onRequestFinished"));

         // Get the messages for the template...
         this.noViewSelectedMessage = this.message("searchlist.no.view.message");
         this.noDataMessage = this.message("searchlist.no.data.message");
         this.fetchingDataMessage = this.message("searchlist.loading.data.message");
         this.renderingViewMessage = this.message("searchlist.rendering.data.message");
         this.fetchingMoreDataMessage = this.message("searchlist.loading.data.message");
         this.dataFailureMessage = this.message("searchlist.data.failure.message");

         this.facetFilters = {};
      },

      /**
       * Reloads the data by making a search using the currently set search attributes. Typically
       * called following actions
       *
       * @instance
       * @param {object} payload The payload of the publication requesting the reload
       */
      reloadData: function alfresco_documentlibrary_AlfSearchList__reloadData() {
         this.resetResultsList();
         this.loadData();
      },

      /**
       * The current term to search on
       *
       * @instance
       * @type {string}
       * @default ""
       */ 
      searchTerm: "",

      /**
       * Updates the current search term. Note that this is not currently sufficient for setting complete
       * search data (such as facets, filters, sort order, etc) so this will need to be iterated on as 
       * needed.
       *
       * @instance
       * @param {object} payload The details of the search term to set
       */
      onSearchTermRequest: function alfresco_documentlibrary_AlfSearchList__onSearchTermRequest(payload) {
         this.alfLog("log", "Setting search term", payload, this);
         var searchTerm = lang.getObject("searchTerm", false, payload);
         if (searchTerm == null)
         {
            this.alfLog("warn", "No searchTerm provided on request", payload, this);
         }
         else if (searchTerm === this.searchTerm)
         {
            // The requested search term is the same as the previous one...
            // We want to allow duplicate searches to be made (to address eventual consistency issues)
            // but we want to prevent concurrent requests using the same data...
            if (this.requestInProgress === true)
            {
               // If a request is currently in progress, then we can just ignore this request.
            }
            else
            {
               // If a request is NOT in progress then we need to manually request a new search, 
               // because re-setting the hash will not trigger the changeFilter function....
               var currHash = ioQuery.queryToObject(hash());
               if (currHash.facetFilters != null && currHash.facetFilters !== "")
               {
                  // The current hash includes facet filters, we need to clear filters when 
                  // setting a search term (even if it is the same), in this case updating the
                  // hash will trigger the search...
                  currHash.searchTerm = this.searchTerm;
                  delete currHash.facetFilters;
                  this.alfPublish("ALF_NAVIGATE_TO_PAGE", {
                     url: ioQuery.objectToQuery(currHash),
                     type: "HASH"
                  }, true);
               }
               else
               {
                  // The current hash has no facet filters so we need to trigger a manual search...
                  this.resetResultsList();
                  this.loadData();
               }
            }
         }
         else 
         {
            // The requested search term is new, so updating the hash will result in a new search...
            this.searchTerm = searchTerm;
            var currHash = ioQuery.queryToObject(hash());
            currHash.searchTerm = this.searchTerm;
            delete currHash.facetFilters;
            this.alfPublish("ALF_NAVIGATE_TO_PAGE", {
               url: ioQuery.objectToQuery(currHash),
               type: "HASH"
            }, true);
         }
      },

      /**
       * The initially selected scope. This should either be "REPO", "ALL_SITES" or the shortname of a
       * specific site.
       *
       * @instance
       * @type {string}
       * @default "REPO"
       */
      selectedScope: "REPO",

      /**
       * 
       *
       * @instance
       * @param {object} payload The details of the scope selected.
       */
      onScopeSelection: function alfresco_documentlibrary_AlfSearchList__onScopeSelection(payload) {
         this.alfLog("log", "Scope selection received", payload, this);
         var scope = lang.getObject("value", false, payload);
         if (scope == null)
         {
            this.alfLog("warn", "No 'value' attribute provided in scope selection payload", payload, this);
         }
         else if (scope === this.selectedScope)
         {
            this.alfLog("log", "Scope requested is currently set", scope, this);
         }
         else
         {
            var currHash = ioQuery.queryToObject(hash());
            this.selectedScope = scope;
            if (scope === "REPO")
            {
               currHash.repo = "true";
               currHash.allSites = "false";
               delete currHash.siteId;
               this.siteId = "";
            }
            else if (scope === "ALL_SITES")
            {
               currHash.repo = "false";
               currHash.allSites = "true";
               delete currHash.siteId;
               this.siteId = "";
            }
            else
            {
               // Must be a site shortname...
               currHash.repo = "false";
               currHash.allSites = "true";
               currHash.siteId = scope;
               this.siteId = scope;
            }

            // Remove any facet filters...
            delete currHash.facetFilters;

            // Update the hash to trigger a search...
            this.alfPublish("ALF_NAVIGATE_TO_PAGE", {
               url: ioQuery.objectToQuery(currHash),
               type: "HASH"
            }, true);
         }
      },

      /**
       * The facet fields to include in searches. This is updated by the onIncludeFacetRequest function.
       * 
       * @instance
       * @type {string}
       * @default ""
       */
      facetFields: "",

      /**
       * 
       * @instance
       * @param {object} payload The details of the facet to include
       */
      onIncludeFacetRequest: function alfresco_documentlibrary_AlfSearchList__onIncludeFacetRequest(payload) {
         this.alfLog("log", "Adding facet filter", payload, this);
         var qname = lang.getObject("qname", false, payload);
         if (qname == null)
         {
            this.alfLog("warn", "No qname provided when adding facet field", payload, this);
         }
         else
         {
            this.facetFields = (this.facetFields != "") ? this.facetFields + "," + qname : qname;
         }
      },

      /**
       * The filters of facets that should be applied to search queries. This can either be configured
       * when the widget is created or can be set via the browser hash fragment.
       *
       * @instance
       * @type {object}
       * @default null
       */
      facetFilters: null,

      /**
       * This function is called as a result of publishing on the "ALF_APPLY_FACET_FILTER" topic. It will
       * update the current [filters]{@link module:alfresco/documentlibrary/AlfSearchList#facetFilters}
       * object with a new entry for the request filter.
       *
       * @instance
       * @param {object} payload The details of the facet filter to apply
       */
      onApplyFacetFilter: function alfresco_documentlibrary_AlfSearchList__onApplyFacetFilter(payload) {
         this.alfLog("log", "Filtering on facet", payload, this);
         var filter = lang.getObject("filter", false, payload);
         if (filter == null)
         {
            this.alfLog("warn", "No filter provided when filtering by facet", payload, this);
         }
         else
         {
            this.facetFilters[filter] = true;
            this.updateFilterHash(filter, "add");
         }
      },

      /**
       * This function is called as a result of publishing on the "ALF_REMOVE_FACET_FILTER" topic. It will
       * update the current [filters]{@link module:alfresco/documentlibrary/AlfSearchList#facetFilters}
       * object to delete the supplied filter
       *
       * @instance
       * @param {object} payload The details of the facet filter to apply
       */
      onRemoveFacetFilter: function alfresco_documentlibrary_AlfSearchList__onRemoveFacetFilter(payload) {
         this.alfLog("log", "Removing facet filter", payload, this);
         delete this.facetFilters[payload.filter];
         this.updateFilterHash(payload.filter, "remove");
      },

      /**
       * Performs updates to the url hash as facets are selected and de-selected
       * 
       * @instance
       */
      updateFilterHash: function alfresco_documentlibrary_AlfSearchList__updateFilterHash(fullFilter, mode) {

         // Get the existing hash and extract the individual facetFilters into an array
         var aHash = ioQuery.queryToObject(hash()),
             facetFilters = ((aHash.facetFilters) ? aHash.facetFilters : ""),
             facetFiltersArr = (facetFilters === "") ? [] : facetFilters.split(",");

         // Add or remove the filter from the hash object
         if(mode === "add" && !arrayUtils.arrayContains(facetFiltersArr, fullFilter))
         {
            facetFiltersArr.push(fullFilter);
         }
         else if (mode === "remove" && arrayUtils.arrayContains(facetFiltersArr, fullFilter))
         {
            facetFiltersArr.splice(facetFiltersArr.indexOf(fullFilter), 1);
         }

         // Put the manipulated filters back into the hash object or remove the property if empty
         if(facetFiltersArr.length < 1)
         {
            delete aHash.facetFilters;
         }
         else
         {
            aHash.facetFilters = facetFiltersArr.join();
         }

         // Send the hash value back to navigation
         this.alfPublish("ALF_NAVIGATE_TO_PAGE", {
            url: ioQuery.objectToQuery(aHash),
            type: "HASH"
         }, true);
      },

      /**
       * If [useHash]{@link module:alfresco/documentlibrary/AlfDocumentList#useHash} has been set to true
       * then this function will be called whenever the browser hash fragment is modified. It will update
       * the attributes of this instance with the values provided in the fragment.
       * 
       * @instance
       * @param {object} payload
       */
      onChangeFilter: function alfresco_documentlibrary_AlfSearchList__onChangeFilter(payload) {
         this.alfLog("log", "Filter change detected", payload, this);

         // Only update if the payload contains one of the variables we care about
         if(this._payloadContainsUpdateableVar(payload))
         {
            // If the search term has changed then we want to delete the facet filters as
            // they might not be applicable to the new search results...
            var newSearchTerm = lang.getObject("searchTerm", false, payload);
            if (newSearchTerm != this.searchTerm)
            {
               this.facetFilters = {};
            }
   
            // The facet filters need to be handled directly because they are NOT just passed as 
            // a simple string. Create a new object for the filters and then break up the filters
            // based on comma delimition and assign each element as a new key in the filters object
            var filters = lang.getObject("facetFilters", false, payload);
            if (filters != null)
            {
               var ff = payload["facetFilters"] = {};
               var fArr = filters.split(",");
               array.forEach(fArr, function(filter) {
                  ff[filter] = true;
               }, this);
            }
            else
            {
               this.facetFilters = {};
            }

            lang.mixin(this, payload);
            this.resetResultsList();
            this.loadData();
         }
      },

      /**
       * Processes all the current search arguments into a payload that is published to the [Search Service]{@link module:alfresco/services/SearchService}
       * to perform the actual search request
       *
       * @instance
       */
      loadData: function alfresco_documentlibrary_AlfSearchList__loadData() {
         if (this.requestInProgress && this.blockConcurrentRequests) 
         {
            // TODO: Inform user that request is in progress?
            this.alfLog("log", "Search request ignored because progress is already in progress");
         }
         else
         {
            if (this.currentRequestId)
            {
                this.alfPublish("ALF_STOP_SEARCH_REQUEST", {
                   requestId: this.currentRequestId
                }, true);
            }

            this.alfPublish(this.requestInProgressTopic, {});
            this.showLoadingMessage();

            var filters = "";
            for (var key in this.facetFilters)
            {
               filters = filters + key.replace(/\.__.u/g, "").replace(/\.__/g, "") + ",";
            }
            filters = filters.substring(0, filters.length - 1);

            // Make sure the repo param is set appropriately...
            // The repo instance variable trumps everything else...
            var repo = this.repo === "true" || !(this.allSites === "true" || (this.siteId != null && this.siteId !== ""));

            this.currentRequestId = this.generateUuid();
            var searchPayload = {
               term: this.searchTerm,
               facetFields: this.facetFields,
               filters: filters,
               sortAscending: this.sortAscending,
               sortField: this.sortField,
               site: this.siteId,
               rootNode: this.rootNode,
               repo: repo,
               requestId: this.currentRequestId
            };

            // InfiniteScroll uses pagination under the covers.
            if (this.useInfiniteScroll)
            {
               // Search API wants startIndex rather than page, so we need to convert here.
               searchPayload.startIndex = (this.currentPage - 1) * this.currentPageSize;
               searchPayload.pageSize = this.currentPageSize;
            }

            // Set a response topic that is scoped to this widget...
            searchPayload.alfResponseTopic = this.pubSubScope + "ALF_RETRIEVE_DOCUMENTS_REQUEST";

            this.alfPublish("ALF_SEARCH_REQUEST", searchPayload, true);
         }
      },

      /**
       * Handles successful calls to get data from the repository.
       * 
       * @instance
       * @param {object} response The response object
       * @param {object} originalRequestConfig The configuration that was passed to the the [serviceXhr]{@link module:alfresco/core/CoreXhr#serviceXhr} function
       */
      onSearchLoadSuccess: function alfresco_documentlibrary_AlfSearchList__onSearchLoadSuccess(payload) {
         this.alfLog("log", "Search Results Loaded", payload, this);
         
         var newData = payload.response;
         this._currentData = newData; // Some code below expects this even if the view is null.

         // Re-render the current view with the new data...
         var view = this.viewMap[this._currentlySelectedView];
         if (view != null)
         {
            this.showRenderingMessage();

            if (this.useInfiniteScroll)
            {
               view.augmentData(newData);
               this._currentData = view.getData();
            }
            else
            {
               view.setData(newData);
            }

            view.renderView(this.useInfiniteScroll);
            this.showView(view);

         }

         // TODO: This should probably be in the SearchService... but will leave here for now...
         var facets = lang.getObject("response.facets", false, payload);
         var filters = lang.getObject("requestConfig.query.filters", false, payload);
         if (facets != null)
         {
            for (var key in facets)
            {
               this.alfPublish("ALF_FACET_RESULTS_" + key, {
                  facetResults: facets[key],
                  activeFilters: filters
               });
            }
         }

         var resultsCount = this._currentData.numberFound != -1 ? this._currentData.numberFound : 0;
         if (resultsCount != null)
         {
            // Publish the number of search results found...
            this.alfPublish("ALF_SEARCH_RESULTS_COUNT", {
               count: resultsCount,
               label: resultsCount
            });
         }
      
         // This request has finished, allow another one to be triggered.
         this.alfPublish(this.requestFinishedTopic, {});

         // Force a resize of the sidebar container to take the new height of the view into account...
         this.alfPublish("ALF_RESIZE_SIDEBAR", {});
      },

      /**
       * Clear Old results from list & reset counts.
       *
       * @instance
       */
      resetResultsList: function alfresco_documentlibrary_AlfSearchList__resetResultsList() {
         this.startIndex = 0;
         this.currentPage = 1;
         this.hideChildren(this.domNode);
         this.alfPublish(this.clearDocDataTopic);
      }

   });
});