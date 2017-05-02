var services = angular.module('app.services', [])

	/**
	* STAGING
	*/

  .constant('API','https://vader-staging.now.sh')
  .constant('NOTIFICATIONS_API', 'https://stormtrooper-staging.now.sh')
  .constant('STRIPE_KEY', 'pk_test_TvTGjUTqPQXD7ZRn1pD5y5e5')