var e107 = e107 || {'settings': {}, 'behaviors': {}};

(function ($)
{
	'use strict';

	e107.settings.draggablePanels = {
		selector: '.draggable-panels',
		items: '> .panel'
	};

	/**
	 * Behavior to initialize draggable panels on the dashboard.
	 *
	 * @type {{attach: e107.behaviors.adminDashboardDraggablePanels.attach}}
	 */
	e107.behaviors.adminDashboardDraggablePanels = {
		attach: function (context, settings)
		{
			var selector = e107.settings.draggablePanels.selector;
			var onceKey = 'admin-dashboard-draggable-panels';

			$(context).find(selector).once(onceKey).each(function ()
			{
				var $panel = $(this);

				$panel.sortable({
					connectWith: selector,
					items: e107.settings.draggablePanels.items,
					handle: '.panel-heading',
					accept: e107.settings.draggablePanels.selector,
					cursor: 'move',
					placeholder: 'draggable-placeholder',
					forcePlaceholderSize: true,
					helper: 'clone',
					forceHelperSize: true,
					opacity: 0.4,
					tolerance: 'pointer',
					start: function (event, ui)
					{
						var $placeholders = $('.draggable-placeholder');
						var $draggablePanels = $(e107.settings.draggablePanels.selector);

						$placeholders.css('margin', '15px');
						$placeholders.css('background-color', '#337ab7');

						$draggablePanels.css('min-height', '20px');
						$draggablePanels.css('border', '1px dashed #CCCCCC');
						$draggablePanels.css('margin-bottom', '30px');

						$panel.sortable("refreshPositions");
					},
					stop: function (event, ui)
					{
						var $draggablePanels = $(e107.settings.draggablePanels.selector);
						$draggablePanels.css('min-height', '0');
						$draggablePanels.css('border', 'none');
						$draggablePanels.css('margin-bottom', '0');

						e107.callbacks.adminDashboardSavePanelOrder();
					}
				});
			});
		}
	};

	e107.callbacks.adminDashboardSavePanelOrder = function ()
	{
		var selector = e107.settings.draggablePanels.selector;
		var NewOrder = [];

		$(selector).each(function ()
		{
			var $this = $(this);
			var key = $this.attr('id');

			if(key)
			{
				NewOrder[key] = [];

				$('#' + key + ' ' + e107.settings.draggablePanels.items).each(function ()
				{
					var $item = $(this);
					var title = $item.find('.panel-title').eq(0).text();

					NewOrder[key].push(title);
				});
			}
		});

		console.log(NewOrder);
	}

})(jQuery);
