export default [{
	"label": {
		"en": "Home"
	},
	"icon": "/slooh/images/nav/home.png",
	"link": "/",
	"type": "basic"
}, {
	"label": {
		"en": "Telescopes"
	},
	"icon": "/slooh/images/nav/telescope.png",
	"type": "children",
	"children": [{
		"label": {
			"en": "Getting Started"
		},
		"link": "/getting-started",
		"type": "basic"
	}, {
		"label": {
			"en": "Recommendations"
		},
		"link": "#/slooh-recommends/existing",
		"type": "basic"
	}, {
		"label": {
			"en": "Calendar View"
		},
		"link": "/calendar",
		"type": "basic"
	}, {
		"label": {
			"en": "My Pictures"
		},
		"link": "/account/media",
		"type": "basic"
	}, {
		"type": "space"
	}, {
		"label": {
			"en": "All Telescopes"
		},
		"link": "#/telescope-overview/1",
		"type": "basic"
	}, {
		"label": {
			"en": "Canary Islands"
		},
		"link": "/telescopes/canary-islands",
		"type": "statuses",
		"datasource": "http://slooh.askmp.ca/data/telescopes/statuses?id=1",
		"children": [{
			"label": {
				"en": "Scope 1"
			},
			"link": "/telescopes/canary-islands/1",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 2"
			},
			"link": "/telescopes/canary-islands/2",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 3"
			},
			"link": "/telescopes/canary-islands/3",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 4"
			},
			"link": "/telescopes/canary-islands/4",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 5"
			},
			"link": "/telescopes/canary-islands/5",
			"type": "basic"
		}]
	}, {
		"label": {
			"en": "Chile"
		},
		"link": "/telescopes/Chile",
		"type": "statuses",
		"datasource": "http://shows.slooh.askmp.ca/telescopes/statuses?id=2",
		"children": [{
			"label": {
				"en": "Scope 1"
			},
			"link": "/telescopes/Chile/1",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 2"
			},
			"link": "/telescopes/Chile/2",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 3"
			},
			"link": "/telescopes/Chile/3",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 4"
			},
			"link": "/telescopes/Chile/4",
			"type": "basic"
		}, {
			"label": {
				"en": "Scope 5"
			},
			"link": "/telescopes/Chile/5",
			"type": "basic"
		}]
	}, {
		"type": "custom",
		"content": "<div><span class=\"green_bull\">&bull;</span>Currently Online</div><div><span class=\"red_bull\">&bull;</span>Currently Offline</div>"
	}]
}, {
	"label": {
		"en": "Shows"
	},
	"icon": "/slooh/images/nav/shows.png",
	"type": "children",
	"children": [{
		"label": {
			"en": "Slooh LIVE"
		},
		"link": "/live",
		"type": "basic"
	}, {
		"label": {
			"en": "Browse Shows"
		},
		"link": "/live",
		"type": "basic"
	}, {
		"label": {
			"en": "Full Schedule"
		},
		"link": "/live",
		"type": "basic"
	}, {
		"label": {
			"en": "Upcoming Shows"
		},
		"type": "components",
		"component": "navShow",
		"datasource": "http://api.slooh.askmp.ca/shows/upcoming?limit=3"
	}]
}, {
	"label": {
		"en": "Community"
	},
	"icon": "/slooh/images/nav/community.png",
	"type": "children",
	"children": [{
		"label": {
			"en": "Latest Pulse"
		},
		"link": "/community",
		"type": "basic"
	}, {
		"label": {
			"en": "Best of Slooh"
		},
		"link": "/community/highlight",
		"type": "basic"
	}, {
		"label": {
			"en": "Discussion Boards"
		},
		"link": "http://forum.slooh.askmp.ca/",
		"type": "basic"
	}, {
		"label": {
			"en": "Guardian Rankings"
		},
		"link": "/community/guardians",
		"type": "basic"
	}, {
		"label": {
			"en": "Full Objects List"
		},
		"link": "/community/objects",
		"type": "basic"
	}, {
		"type": "space"
	}, {
		"label": {
			"en": "Hot this Month"
		},
		"type": "basic-loaded",
		"datasource": "http://api.slooh.askmp.ca/community/hot"
	}, {
		"type": "space"
	}, {
		"type": "component",
		"component": "navCTA",
		"datasource": "http://api.slooh.askmp.ca/community_cta"
	}, {
		"type": "custom",
		"content": "[social media HTML]"
	}]
}, {
	"label": {
		"en": "About"
	},
	"icon": "/slooh/images/nav/about.png",
	"type": "children",
	"children": [{
		"label": {
			"en": "Our Mission"
		},
		"link": "/about",
		"type": "basic"
	}, {
		"label": {
			"en": "In the News"
		},
		"link": "/about/media",
		"type": "basic"
	}, {
		"label": {
			"en": "The Team"
		},
		"link": "/about/#team",
		"type": "basic"
	}, {
		"label": {
			"en": "Advisors & Guest Profiles"
		},
		"link": "/about/#advisors",
		"type": "basic"
	}, {
		"label": {
			"en": "Partners"
		},
		"link": "/about/#partners",
		"type": "basic"
	}, {
		"label": {
			"en": "Media Kit"
		},
		"link": "/about/media",
		"type": "basic"
	}, {
		"label": {
			"en": "Contact Us"
		},
		"link": "/about/#contact",
		"type": "basic"
	}, {
		"label": {
			"en": "Upcoming Shows"
		},
		"type": "components",
		"component": "navShow",
		"datasource": "http://api.slooh.askmp.ca/shows/upcoming?limit=1"
	}]
}, {
	"label": {
		"en": "Help"
	},
	"icon": "/slooh/images/nav/help.png",
	"link": "/",
	"type": "children",
	"children": [{
		"label": {
			"en": "New to Slooh?"
		},
		"link": "/about",
		"type": "basic"
	}, {
		"type": "space"
	}, {
		"label": {
			"en": "QuickStart Guides"
		},
		"link": "/help",
		"type": "basic"
	}, {
		"label": {
			"en": "Troubleshooting"
		},
		"link": "/help/#troubleshooting",
		"type": "basic"
	}, {
		"label": {
			"en": "Practice Activities"
		},
		"link": "/help#practice",
		"type": "basic"
	}, {
		"label": {
			"en": "Image Management"
		},
		"link": "/help/images",
		"type": "basic"
	}, {
		"label": {
			"en": "Astophotography 101"
		},
		"link": "/help/photography",
		"type": "basic"
	}, {
		"label": {
			"en": "Whatâ€™s Visible When?"
		},
		"link": "/community/objects",
		"type": "basic"
	}, {
		"label": {
			"en": "Hints and Tips"
		},
		"link": "/help/#hints",
		"type": "basic"
	}, {
		"type": "space"
	}, {
		"label": {
			"en": "Trouble Logging In?"
		},
		"link": "/help/account",
		"type": "basic"
	}, {
		"label": {
			"en": "Pricing Tiers"
		},
		"link": "/help/#account",
		"type": "basic"
	}, {
		"label": {
			"en": "Account FAQs"
		},
		"link": "/help/#account",
		"type": "basic"
	}, {
		"label": {
			"en": "Shows FAQs"
		},
		"link": "/help/shows",
		"type": "basic"
	}, {
		"label": {
			"en": "Telescope & Reservations FAQs"
		},
		"link": "/help/telescopes",
		"type": "basic"
	}, {
		"type": "space"
	}, {
		"label": {
			"en": "Contact Customer Support"
		},
		"link": "/help/contact",
		"type": "basic"
	}, {
		"label": {
			"en": "Site Feedback"
		},
		"link": "/help/contact#feedback",
		"type": "basic"
	}]
}, {
	"label": {
		"en": "Settings"
	},
	"icon": "/slooh/images/nav/settings.png",
	"link": "/",
	"type": "children",
	"children": [{
		"label": {
			"en": "Personal Profile"
		},
		"link": "/account",
		"type": "basic"
	}, {
		"label": {
			"en": "Subscription Management"
		},
		"link": "/account/subscription",
		"type": "basic"
	}, {
		"label": {
			"en": "Alerts & Email Settings"
		},
		"link": "/account/#notifications",
		"type": "basic"
	}]
}];
