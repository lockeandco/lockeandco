const NEXT_PUBLIC_AWSCONFIG = {
	aws_project_region: 'us-west-2',
	aws_cognito_identity_pool_id:
		'us-west-2:3380defa-8645-416a-89bd-b834a739c22c',
	aws_cognito_region: 'us-west-2',
	aws_user_pools_id: 'us-west-2_iJ3HHKfuG',
	aws_user_pools_web_client_id: '46k9379qi0jpfukianhfr22cll',
	oauth: {
		domain:
			'lockeandco135e34ac-135e34ac-production.auth.us-west-2.amazoncognito.com',
		scope: [
			'phone',
			'email',
			'openid',
			'profile',
			'aws.cognito.signin.user.admin',
		],
		redirectSignIn:
			'https://www.lockeand.co/redirect/,http://localhost:3000/redirect/',
		redirectSignOut:
			'https://www.lockeand.co/signout/,http://localhost:3000/signout/',
		responseType: 'code',
	},
	federationTarget: 'COGNITO_USER_POOLS',
	aws_mobile_analytics_app_id: '3b5ed5b55476419fa2c702a685165b7b',
	aws_mobile_analytics_app_region: 'us-west-2',
	aws_appsync_graphqlEndpoint:
		'https://wxbfm6btzfejtld36nuf335j3i.appsync-api.us-west-2.amazonaws.com/graphql',
	aws_appsync_region: 'us-west-2',
	aws_appsync_authenticationType: 'API_KEY',
	aws_appsync_apiKey: 'da2-nbklutqavjcm7ajmkz7ir6ktwu',
	aws_dynamodb_all_tables_region: 'us-west-2',
	aws_dynamodb_table_schemas: [
		{tableName: 'lockeandco-production', region: 'us-west-2'},
	],
}