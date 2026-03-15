const systemDesigns = {
    "exam-portal": {
        "title": "Online Exam Portal",
        "overview": "Highly secure, real-time proctored assessment platform strictly engineered to support 5,000+ concurrent students without a single dropped packet. It boasts absolute zero data loss, sub-second latency, and AI-driven anti-cheat mechanisms.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "React.js",
            "Kubernetes",
            "PostgreSQL",
            "Redis",
            "WebRTC",
            "AI"
        ],
        "isExternal": false,
        "category": "educational",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Online Exam Portal logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Online Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "online_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "url-shortener": {
        "title": "URL Shortener (Bitly)",
        "overview": "A highly scalable, distributed architecture designed for URL Shortener (Bitly). Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Node.js",
            "Redis",
            "Cassandra",
            "Nginx",
            "KGS"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core URL Shortener (Bitly) logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core URL Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "url_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "rate-limiter": {
        "title": "API Rate Limiter",
        "overview": "A highly scalable, distributed architecture designed for API Rate Limiter. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Go",
            "Redis",
            "API Gateway",
            "Lua",
            "Token Bucket"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core API Rate Limiter logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core API Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "api_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "unique-id-generator": {
        "title": "Distributed Unique ID Generator",
        "overview": "A highly scalable, distributed architecture designed for Distributed Unique ID Generator. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Scala",
            "ZooKeeper",
            "Snowflake",
            "NTP"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Distributed Unique ID Generator logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Distributed Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "distributed_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "ticket-booking": {
        "title": "Ticket Booking (BookMyShow)",
        "overview": "Ticket Booking (BookMyShow) requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Node.js",
            "Redis",
            "MySQL",
            "Kafka",
            "Elasticsearch"
        ],
        "isExternal": false,
        "category": "ecommerce",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "shopping-cart",
                    "title": "Catalog & Search",
                    "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."
                },
                {
                    "icon": "database",
                    "title": "Inventory Management",
                    "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."
                },
                {
                    "icon": "credit-card",
                    "title": "Payments Integration",
                    "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."
                },
                {
                    "icon": "truck",
                    "title": "Order Fulfillment",
                    "desc": "State machine tracking order lifecycle from cart \u2192 warehouse \u2192 delivery."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Ticket Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "parking-lot": {
        "title": "Parking Lot System",
        "overview": "Parking Lot System requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Java",
            "SQL",
            "Redis",
            "Spring Boot",
            "IoT"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Parking Lot System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Parking Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "uber": {
        "title": "Ride Sharing App (Uber)",
        "overview": "The Ride Sharing App (Uber) is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes.",
        "architecture": "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage.",
        "database_desc": "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters.",
        "security": "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse.",
        "monitoring": "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests.",
        "techStack": [
            "Go",
            "Kafka",
            "PostGIS",
            "Cassandra",
            "WebSockets"
        ],
        "isExternal": false,
        "category": "geospatial",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "map-pin",
                    "title": "Location Tracking",
                    "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."
                },
                {
                    "icon": "navigation",
                    "title": "Proximity Matching",
                    "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."
                },
                {
                    "icon": "git-merge",
                    "title": "Routing & Dispatch",
                    "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."
                },
                {
                    "icon": "smartphone",
                    "title": "Persistent Connections",
                    "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "location",
                    "title": "Location Ingestion Service",
                    "icon": "crosshair",
                    "details": "Massive Write Volume \u00b7 UDP/WebSockets",
                    "responsibilities": [
                        "Ingests 5-second interval GPS pings",
                        "Updates Spatial indices (QuadTree/Geohash)",
                        "Publishes location streams to event bus"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/ws/location/stream"
                        }
                    ],
                    "db": "PostGIS / Cassandra",
                    "cache": "Redis Geospatial (Current Pos)"
                },
                {
                    "id": "matching",
                    "title": "Matching & Dispatch Engine",
                    "icon": "zap",
                    "details": "Algorithmic \u00b7 Low Latency",
                    "responsibilities": [
                        "Queries nearby entities via spatial radius search",
                        "Calculates ETAs via routing graph",
                        "Creates optimized pairings and locks state"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/dispatch/request"
                        }
                    ],
                    "db": "Graph DB (Routing)",
                    "cache": "Redis (State Locks)"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "locations",
                    "title": "active_locations (Redis / PostGIS)",
                    "cols": "4 cols",
                    "index": "Geohash Index",
                    "columns": [
                        {
                            "name": "entity_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "lat",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "lng",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "geohash",
                            "type": "VARCHAR",
                            "notes": "For fast proximity bounding box"
                        }
                    ]
                }
            ]
        }
    },
    "whatsapp": {
        "title": "Chat App (WhatsApp)",
        "overview": "Architected for near-instantaneous global state delivery, Chat App (WhatsApp) operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times.",
        "architecture": "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue.",
        "database_desc": "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp.",
        "security": "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks.",
        "monitoring": "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs.",
        "techStack": [
            "Erlang",
            "WebSockets",
            "Cassandra",
            "Redis",
            "Signal Protocol"
        ],
        "isExternal": false,
        "category": "messaging",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "message-square",
                    "title": "Real-time Messaging",
                    "desc": "1-on-1 and group chat delivery with < 100ms latency globally."
                },
                {
                    "icon": "wifi",
                    "title": "Presence Indicators",
                    "desc": "Online/offline status and typing indicators broadcasted efficiently."
                },
                {
                    "icon": "lock",
                    "title": "E2E Encryption",
                    "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."
                },
                {
                    "icon": "server",
                    "title": "Offline Storage",
                    "desc": "Persistent queueing for delivering messages when users come back online."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "gateway",
                    "title": "WebSocket Gateway Cluster",
                    "icon": "plug",
                    "details": "Long-lived connections \u00b7 Stateful routing",
                    "responsibilities": [
                        "Maintains persistent TCP/WS links per active client",
                        "Routes inbound messages to internal bus",
                        "Pushes outbound payload deliveries"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/chat/connect"
                        }
                    ],
                    "db": "N/A",
                    "cache": "Redis (Session mapping: User -> Node)"
                },
                {
                    "id": "message-router",
                    "title": "Message Routing Service",
                    "icon": "mail",
                    "details": "High throughput routing",
                    "responsibilities": [
                        "Determines if recipient is online via Presence service",
                        "Routes payload directly or sends to offline storage",
                        "Manages fan-out for large group chats"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal gRPC / Queues"
                        }
                    ],
                    "db": "Cassandra (Offline/History)",
                    "cache": "Kafka Event Bus"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "messages",
                    "title": "messages (Wide-Column)",
                    "cols": "5 cols",
                    "index": "Clustering Key: timestamp",
                    "columns": [
                        {
                            "name": "chat_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "message_id",
                            "type": "TIMEUUID",
                            "notes": "Clustering Key (Sorted)"
                        },
                        {
                            "name": "sender_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "payload",
                            "type": "BLOB",
                            "notes": "Encrypted cipher text"
                        },
                        {
                            "name": "status",
                            "type": "TINYINT",
                            "notes": "0=Sent, 1=Delivered, 2=Read"
                        }
                    ]
                }
            ]
        }
    },
    "netflix": {
        "title": "Video Streaming (Netflix)",
        "overview": "The Video Streaming (Netflix) architecture is a state-of-the-art distributed system optimized for extreme bandwidth requirements and real-time media delivery. It is meticulously designed to handle thousands of concurrent read requests per second while maintaining sub-second buffer times globally. By pushing logic to the edge and employing complex asynchronous transcoding pipelines, the system guarantees 99.99% availability.",
        "architecture": "The request life-cycle begins with DNS resolution routing users to the nearest CDN edge node. Static assets and manifest files are served immediately. For dynamic operations, the API Gateway authenticates the request via stateless JWTs before routing to the microservice mesh. Media ingestion triggers an event-driven workflow via Kafka, where asynchronous transcoders split the media into smaller chunks and HLS/DASH formats before persisting to blob storage.",
        "database_desc": "Media structural metadata and user preferences are mapped to highly-available wide-column stores like Cassandra, ensuring multi-region replication. High-cardinality search data uses Elasticsearch, while raw video blobs are maintained in S3.",
        "security": "Security centers around robust Digital Rights Management (DRM). Media streams are encrypted at rest and in transit via TLS 1.3. Signed URLs with short expiration times prevent hotlinking. API Rate limiters dampen brute-force attacks at the application edge.",
        "monitoring": "Global latency and CDN cache hit ratios are tracked dynamically. The system monitors rebuffering events and player drops via Datadog, utilizing Prometheus for active cluster telemetry.",
        "techStack": [
            "Python",
            "CDN",
            "Cassandra",
            "Kafka",
            "HLS",
            "Blob Storage"
        ],
        "isExternal": false,
        "category": "streaming",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "play-circle",
                    "title": "Media Delivery",
                    "desc": "Adaptive bitrate streaming with sub-second buffer times via Edge CDN."
                },
                {
                    "icon": "upload-cloud",
                    "title": "Content Ingestion",
                    "desc": "Asynchronous transcoding pipelines converting media to HLS/DASH formats."
                },
                {
                    "icon": "activity",
                    "title": "Telemetry",
                    "desc": "Real-time tracking of viewing history, buffer rates, and drop-offs."
                },
                {
                    "icon": "shield",
                    "title": "Digital Rights Management",
                    "desc": "DRM encryption integration to protect premium copyrighted media."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "playback",
                    "title": "Playback Authorization API",
                    "icon": "play",
                    "details": "High read volume \u00b7 Edge proximity",
                    "responsibilities": [
                        "Resolves user device to optimal CDN node",
                        "Issues short-lived signed URLs for media chunks",
                        "Validates subscription and concurrent device limits"
                    ],
                    "endpoints": [
                        {
                            "method": "GET",
                            "path": "/api/v1/play/manifest/:id"
                        }
                    ],
                    "db": "Cassandra (View State)",
                    "cache": "Redis (Active Streams)"
                },
                {
                    "id": "transcoding",
                    "title": "Transcoder Worker Pool",
                    "icon": "film",
                    "details": "CPU intensive \u00b7 Asynchronous",
                    "responsibilities": [
                        "Pulls raw media from ingest S3 buckets",
                        "Splits video into adaptive bitrate chunks (1080p, 720p, etc.)",
                        "Pushes processed shards to CDN origins"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal Event Driven (Kafka)"
                        }
                    ],
                    "db": "Amazon S3 (Blobs)",
                    "cache": "Local NVMe Drives"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "media_metadata",
                    "title": "media_metadata (NoSQL)",
                    "cols": "5 cols",
                    "index": "idx_genre",
                    "columns": [
                        {
                            "name": "media_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "title",
                            "type": "VARCHAR",
                            "notes": ""
                        },
                        {
                            "name": "manifest_url",
                            "type": "VARCHAR",
                            "notes": "S3/CDN pointer"
                        },
                        {
                            "name": "duration_sec",
                            "type": "INT",
                            "notes": ""
                        },
                        {
                            "name": "resolutions",
                            "type": "JSONB",
                            "notes": "e.g., [1080, 720, 480]"
                        }
                    ]
                }
            ]
        }
    },
    "twitter": {
        "title": "Twitter Architecture",
        "overview": "A highly scalable, distributed architecture designed for Twitter Architecture. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Scala",
            "Redis",
            "GraphDB",
            "Memcached",
            "Fan-out"
        ],
        "isExternal": false,
        "category": "social",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Twitter Architecture logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Twitter Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "twitter_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "instagram": {
        "title": "Photo Sharing (Instagram)",
        "overview": "A highly scalable, distributed architecture designed for Photo Sharing (Instagram). Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Python",
            "CDN",
            "PostgreSQL",
            "Redis",
            "S3"
        ],
        "isExternal": false,
        "category": "social",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Photo Sharing (Instagram) logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Photo Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "photo_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "dropbox": {
        "title": "File Storage & Sync (Dropbox)",
        "overview": "A highly scalable, distributed architecture designed for File Storage & Sync (Dropbox). Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "C++",
            "S3",
            "MySQL",
            "Kafka",
            "Block Storage"
        ],
        "isExternal": false,
        "category": "storage",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core File Storage & Sync (Dropbox) logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core File Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "file_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "tinder": {
        "title": "Location Matchmaking (Tinder)",
        "overview": "The Location Matchmaking (Tinder) is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes.",
        "architecture": "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage.",
        "database_desc": "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters.",
        "security": "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse.",
        "monitoring": "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests.",
        "techStack": [
            "Node.js",
            "Elasticsearch",
            "Redis",
            "Kafka",
            "Geospatial"
        ],
        "isExternal": false,
        "category": "geospatial",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "map-pin",
                    "title": "Location Tracking",
                    "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."
                },
                {
                    "icon": "navigation",
                    "title": "Proximity Matching",
                    "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."
                },
                {
                    "icon": "git-merge",
                    "title": "Routing & Dispatch",
                    "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."
                },
                {
                    "icon": "smartphone",
                    "title": "Persistent Connections",
                    "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "location",
                    "title": "Location Ingestion Service",
                    "icon": "crosshair",
                    "details": "Massive Write Volume \u00b7 UDP/WebSockets",
                    "responsibilities": [
                        "Ingests 5-second interval GPS pings",
                        "Updates Spatial indices (QuadTree/Geohash)",
                        "Publishes location streams to event bus"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/ws/location/stream"
                        }
                    ],
                    "db": "PostGIS / Cassandra",
                    "cache": "Redis Geospatial (Current Pos)"
                },
                {
                    "id": "matching",
                    "title": "Matching & Dispatch Engine",
                    "icon": "zap",
                    "details": "Algorithmic \u00b7 Low Latency",
                    "responsibilities": [
                        "Queries nearby entities via spatial radius search",
                        "Calculates ETAs via routing graph",
                        "Creates optimized pairings and locks state"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/dispatch/request"
                        }
                    ],
                    "db": "Graph DB (Routing)",
                    "cache": "Redis (State Locks)"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "locations",
                    "title": "active_locations (Redis / PostGIS)",
                    "cols": "4 cols",
                    "index": "Geohash Index",
                    "columns": [
                        {
                            "name": "entity_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "lat",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "lng",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "geohash",
                            "type": "VARCHAR",
                            "notes": "For fast proximity bounding box"
                        }
                    ]
                }
            ]
        }
    },
    "amazon": {
        "title": "E-commerce (Amazon)",
        "overview": "E-commerce (Amazon) requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Java",
            "DynamoDB",
            "Kafka",
            "Elasticsearch",
            "Microservices"
        ],
        "isExternal": false,
        "category": "ecommerce",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "shopping-cart",
                    "title": "Catalog & Search",
                    "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."
                },
                {
                    "icon": "database",
                    "title": "Inventory Management",
                    "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."
                },
                {
                    "icon": "credit-card",
                    "title": "Payments Integration",
                    "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."
                },
                {
                    "icon": "truck",
                    "title": "Order Fulfillment",
                    "desc": "State machine tracking order lifecycle from cart \u2192 warehouse \u2192 delivery."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core E-commerce Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "youtube": {
        "title": "Video Sharing (YouTube)",
        "overview": "The Video Sharing (YouTube) architecture is a state-of-the-art distributed system optimized for extreme bandwidth requirements and real-time media delivery. It is meticulously designed to handle thousands of concurrent read requests per second while maintaining sub-second buffer times globally. By pushing logic to the edge and employing complex asynchronous transcoding pipelines, the system guarantees 99.99% availability.",
        "architecture": "The request life-cycle begins with DNS resolution routing users to the nearest CDN edge node. Static assets and manifest files are served immediately. For dynamic operations, the API Gateway authenticates the request via stateless JWTs before routing to the microservice mesh. Media ingestion triggers an event-driven workflow via Kafka, where asynchronous transcoders split the media into smaller chunks and HLS/DASH formats before persisting to blob storage.",
        "database_desc": "Media structural metadata and user preferences are mapped to highly-available wide-column stores like Cassandra, ensuring multi-region replication. High-cardinality search data uses Elasticsearch, while raw video blobs are maintained in S3.",
        "security": "Security centers around robust Digital Rights Management (DRM). Media streams are encrypted at rest and in transit via TLS 1.3. Signed URLs with short expiration times prevent hotlinking. API Rate limiters dampen brute-force attacks at the application edge.",
        "monitoring": "Global latency and CDN cache hit ratios are tracked dynamically. The system monitors rebuffering events and player drops via Datadog, utilizing Prometheus for active cluster telemetry.",
        "techStack": [
            "C++",
            "Bigtable",
            "CDN",
            "Python",
            "Transcoding"
        ],
        "isExternal": false,
        "category": "streaming",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "play-circle",
                    "title": "Media Delivery",
                    "desc": "Adaptive bitrate streaming with sub-second buffer times via Edge CDN."
                },
                {
                    "icon": "upload-cloud",
                    "title": "Content Ingestion",
                    "desc": "Asynchronous transcoding pipelines converting media to HLS/DASH formats."
                },
                {
                    "icon": "activity",
                    "title": "Telemetry",
                    "desc": "Real-time tracking of viewing history, buffer rates, and drop-offs."
                },
                {
                    "icon": "shield",
                    "title": "Digital Rights Management",
                    "desc": "DRM encryption integration to protect premium copyrighted media."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "playback",
                    "title": "Playback Authorization API",
                    "icon": "play",
                    "details": "High read volume \u00b7 Edge proximity",
                    "responsibilities": [
                        "Resolves user device to optimal CDN node",
                        "Issues short-lived signed URLs for media chunks",
                        "Validates subscription and concurrent device limits"
                    ],
                    "endpoints": [
                        {
                            "method": "GET",
                            "path": "/api/v1/play/manifest/:id"
                        }
                    ],
                    "db": "Cassandra (View State)",
                    "cache": "Redis (Active Streams)"
                },
                {
                    "id": "transcoding",
                    "title": "Transcoder Worker Pool",
                    "icon": "film",
                    "details": "CPU intensive \u00b7 Asynchronous",
                    "responsibilities": [
                        "Pulls raw media from ingest S3 buckets",
                        "Splits video into adaptive bitrate chunks (1080p, 720p, etc.)",
                        "Pushes processed shards to CDN origins"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal Event Driven (Kafka)"
                        }
                    ],
                    "db": "Amazon S3 (Blobs)",
                    "cache": "Local NVMe Drives"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "media_metadata",
                    "title": "media_metadata (NoSQL)",
                    "cols": "5 cols",
                    "index": "idx_genre",
                    "columns": [
                        {
                            "name": "media_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "title",
                            "type": "VARCHAR",
                            "notes": ""
                        },
                        {
                            "name": "manifest_url",
                            "type": "VARCHAR",
                            "notes": "S3/CDN pointer"
                        },
                        {
                            "name": "duration_sec",
                            "type": "INT",
                            "notes": ""
                        },
                        {
                            "name": "resolutions",
                            "type": "JSONB",
                            "notes": "e.g., [1080, 720, 480]"
                        }
                    ]
                }
            ]
        }
    },
    "google-maps": {
        "title": "Navigation (Google Maps)",
        "overview": "The Navigation (Google Maps) is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes.",
        "architecture": "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage.",
        "database_desc": "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters.",
        "security": "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse.",
        "monitoring": "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests.",
        "techStack": [
            "C++",
            "Graph-DB",
            "Redis",
            "Kafka",
            "QuadTree"
        ],
        "isExternal": false,
        "category": "geospatial",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "map-pin",
                    "title": "Location Tracking",
                    "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."
                },
                {
                    "icon": "navigation",
                    "title": "Proximity Matching",
                    "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."
                },
                {
                    "icon": "git-merge",
                    "title": "Routing & Dispatch",
                    "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."
                },
                {
                    "icon": "smartphone",
                    "title": "Persistent Connections",
                    "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "location",
                    "title": "Location Ingestion Service",
                    "icon": "crosshair",
                    "details": "Massive Write Volume \u00b7 UDP/WebSockets",
                    "responsibilities": [
                        "Ingests 5-second interval GPS pings",
                        "Updates Spatial indices (QuadTree/Geohash)",
                        "Publishes location streams to event bus"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/ws/location/stream"
                        }
                    ],
                    "db": "PostGIS / Cassandra",
                    "cache": "Redis Geospatial (Current Pos)"
                },
                {
                    "id": "matching",
                    "title": "Matching & Dispatch Engine",
                    "icon": "zap",
                    "details": "Algorithmic \u00b7 Low Latency",
                    "responsibilities": [
                        "Queries nearby entities via spatial radius search",
                        "Calculates ETAs via routing graph",
                        "Creates optimized pairings and locks state"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/dispatch/request"
                        }
                    ],
                    "db": "Graph DB (Routing)",
                    "cache": "Redis (State Locks)"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "locations",
                    "title": "active_locations (Redis / PostGIS)",
                    "cols": "4 cols",
                    "index": "Geohash Index",
                    "columns": [
                        {
                            "name": "entity_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "lat",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "lng",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "geohash",
                            "type": "VARCHAR",
                            "notes": "For fast proximity bounding box"
                        }
                    ]
                }
            ]
        }
    },
    "zoom": {
        "title": "Video Conferencing (Zoom)",
        "overview": "The Video Conferencing (Zoom) architecture is a state-of-the-art distributed system optimized for extreme bandwidth requirements and real-time media delivery. It is meticulously designed to handle thousands of concurrent read requests per second while maintaining sub-second buffer times globally. By pushing logic to the edge and employing complex asynchronous transcoding pipelines, the system guarantees 99.99% availability.",
        "architecture": "The request life-cycle begins with DNS resolution routing users to the nearest CDN edge node. Static assets and manifest files are served immediately. For dynamic operations, the API Gateway authenticates the request via stateless JWTs before routing to the microservice mesh. Media ingestion triggers an event-driven workflow via Kafka, where asynchronous transcoders split the media into smaller chunks and HLS/DASH formats before persisting to blob storage.",
        "database_desc": "Media structural metadata and user preferences are mapped to highly-available wide-column stores like Cassandra, ensuring multi-region replication. High-cardinality search data uses Elasticsearch, while raw video blobs are maintained in S3.",
        "security": "Security centers around robust Digital Rights Management (DRM). Media streams are encrypted at rest and in transit via TLS 1.3. Signed URLs with short expiration times prevent hotlinking. API Rate limiters dampen brute-force attacks at the application edge.",
        "monitoring": "Global latency and CDN cache hit ratios are tracked dynamically. The system monitors rebuffering events and player drops via Datadog, utilizing Prometheus for active cluster telemetry.",
        "techStack": [
            "C++",
            "WebRTC",
            "Redis",
            "WebSockets",
            "UDP"
        ],
        "isExternal": false,
        "category": "streaming",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "play-circle",
                    "title": "Media Delivery",
                    "desc": "Adaptive bitrate streaming with sub-second buffer times via Edge CDN."
                },
                {
                    "icon": "upload-cloud",
                    "title": "Content Ingestion",
                    "desc": "Asynchronous transcoding pipelines converting media to HLS/DASH formats."
                },
                {
                    "icon": "activity",
                    "title": "Telemetry",
                    "desc": "Real-time tracking of viewing history, buffer rates, and drop-offs."
                },
                {
                    "icon": "shield",
                    "title": "Digital Rights Management",
                    "desc": "DRM encryption integration to protect premium copyrighted media."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "playback",
                    "title": "Playback Authorization API",
                    "icon": "play",
                    "details": "High read volume \u00b7 Edge proximity",
                    "responsibilities": [
                        "Resolves user device to optimal CDN node",
                        "Issues short-lived signed URLs for media chunks",
                        "Validates subscription and concurrent device limits"
                    ],
                    "endpoints": [
                        {
                            "method": "GET",
                            "path": "/api/v1/play/manifest/:id"
                        }
                    ],
                    "db": "Cassandra (View State)",
                    "cache": "Redis (Active Streams)"
                },
                {
                    "id": "transcoding",
                    "title": "Transcoder Worker Pool",
                    "icon": "film",
                    "details": "CPU intensive \u00b7 Asynchronous",
                    "responsibilities": [
                        "Pulls raw media from ingest S3 buckets",
                        "Splits video into adaptive bitrate chunks (1080p, 720p, etc.)",
                        "Pushes processed shards to CDN origins"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal Event Driven (Kafka)"
                        }
                    ],
                    "db": "Amazon S3 (Blobs)",
                    "cache": "Local NVMe Drives"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "media_metadata",
                    "title": "media_metadata (NoSQL)",
                    "cols": "5 cols",
                    "index": "idx_genre",
                    "columns": [
                        {
                            "name": "media_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "title",
                            "type": "VARCHAR",
                            "notes": ""
                        },
                        {
                            "name": "manifest_url",
                            "type": "VARCHAR",
                            "notes": "S3/CDN pointer"
                        },
                        {
                            "name": "duration_sec",
                            "type": "INT",
                            "notes": ""
                        },
                        {
                            "name": "resolutions",
                            "type": "JSONB",
                            "notes": "e.g., [1080, 720, 480]"
                        }
                    ]
                }
            ]
        }
    },
    "slack": {
        "title": "Team Collaboration (Slack)",
        "overview": "Architected for near-instantaneous global state delivery, Team Collaboration (Slack) operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times.",
        "architecture": "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue.",
        "database_desc": "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp.",
        "security": "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks.",
        "monitoring": "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs.",
        "techStack": [
            "Electron",
            "WebSockets",
            "MySQL",
            "Redis",
            "Solr"
        ],
        "isExternal": false,
        "category": "messaging",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "message-square",
                    "title": "Real-time Messaging",
                    "desc": "1-on-1 and group chat delivery with < 100ms latency globally."
                },
                {
                    "icon": "wifi",
                    "title": "Presence Indicators",
                    "desc": "Online/offline status and typing indicators broadcasted efficiently."
                },
                {
                    "icon": "lock",
                    "title": "E2E Encryption",
                    "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."
                },
                {
                    "icon": "server",
                    "title": "Offline Storage",
                    "desc": "Persistent queueing for delivering messages when users come back online."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "gateway",
                    "title": "WebSocket Gateway Cluster",
                    "icon": "plug",
                    "details": "Long-lived connections \u00b7 Stateful routing",
                    "responsibilities": [
                        "Maintains persistent TCP/WS links per active client",
                        "Routes inbound messages to internal bus",
                        "Pushes outbound payload deliveries"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/chat/connect"
                        }
                    ],
                    "db": "N/A",
                    "cache": "Redis (Session mapping: User -> Node)"
                },
                {
                    "id": "message-router",
                    "title": "Message Routing Service",
                    "icon": "mail",
                    "details": "High throughput routing",
                    "responsibilities": [
                        "Determines if recipient is online via Presence service",
                        "Routes payload directly or sends to offline storage",
                        "Manages fan-out for large group chats"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal gRPC / Queues"
                        }
                    ],
                    "db": "Cassandra (Offline/History)",
                    "cache": "Kafka Event Bus"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "messages",
                    "title": "messages (Wide-Column)",
                    "cols": "5 cols",
                    "index": "Clustering Key: timestamp",
                    "columns": [
                        {
                            "name": "chat_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "message_id",
                            "type": "TIMEUUID",
                            "notes": "Clustering Key (Sorted)"
                        },
                        {
                            "name": "sender_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "payload",
                            "type": "BLOB",
                            "notes": "Encrypted cipher text"
                        },
                        {
                            "name": "status",
                            "type": "TINYINT",
                            "notes": "0=Sent, 1=Delivered, 2=Read"
                        }
                    ]
                }
            ]
        }
    },
    "discord": {
        "title": "Voice Chat (Discord)",
        "overview": "Architected for near-instantaneous global state delivery, Voice Chat (Discord) operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times.",
        "architecture": "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue.",
        "database_desc": "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp.",
        "security": "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks.",
        "monitoring": "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs.",
        "techStack": [
            "Elixir",
            "Cassandra",
            "WebRTC",
            "Redis",
            "Erlang VM"
        ],
        "isExternal": false,
        "category": "messaging",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "message-square",
                    "title": "Real-time Messaging",
                    "desc": "1-on-1 and group chat delivery with < 100ms latency globally."
                },
                {
                    "icon": "wifi",
                    "title": "Presence Indicators",
                    "desc": "Online/offline status and typing indicators broadcasted efficiently."
                },
                {
                    "icon": "lock",
                    "title": "E2E Encryption",
                    "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."
                },
                {
                    "icon": "server",
                    "title": "Offline Storage",
                    "desc": "Persistent queueing for delivering messages when users come back online."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "gateway",
                    "title": "WebSocket Gateway Cluster",
                    "icon": "plug",
                    "details": "Long-lived connections \u00b7 Stateful routing",
                    "responsibilities": [
                        "Maintains persistent TCP/WS links per active client",
                        "Routes inbound messages to internal bus",
                        "Pushes outbound payload deliveries"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/chat/connect"
                        }
                    ],
                    "db": "N/A",
                    "cache": "Redis (Session mapping: User -> Node)"
                },
                {
                    "id": "message-router",
                    "title": "Message Routing Service",
                    "icon": "mail",
                    "details": "High throughput routing",
                    "responsibilities": [
                        "Determines if recipient is online via Presence service",
                        "Routes payload directly or sends to offline storage",
                        "Manages fan-out for large group chats"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal gRPC / Queues"
                        }
                    ],
                    "db": "Cassandra (Offline/History)",
                    "cache": "Kafka Event Bus"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "messages",
                    "title": "messages (Wide-Column)",
                    "cols": "5 cols",
                    "index": "Clustering Key: timestamp",
                    "columns": [
                        {
                            "name": "chat_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "message_id",
                            "type": "TIMEUUID",
                            "notes": "Clustering Key (Sorted)"
                        },
                        {
                            "name": "sender_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "payload",
                            "type": "BLOB",
                            "notes": "Encrypted cipher text"
                        },
                        {
                            "name": "status",
                            "type": "TINYINT",
                            "notes": "0=Sent, 1=Delivered, 2=Read"
                        }
                    ]
                }
            ]
        }
    },
    "web-crawler": {
        "title": "Distributed Web Crawler",
        "overview": "A highly scalable, distributed architecture designed for Distributed Web Crawler. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Python",
            "Kafka",
            "Redis",
            "Cassandra",
            "BFS"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Distributed Web Crawler logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Distributed Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "distributed_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "search-engine": {
        "title": "Search Engine",
        "overview": "A highly scalable, distributed architecture designed for Search Engine. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "C++",
            "Bigtable",
            "MapReduce",
            "Redis",
            "Inverted Index"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Search Engine logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Search Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "search_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "key-value-store": {
        "title": "Key-Value Store",
        "overview": "A highly scalable, distributed architecture designed for Key-Value Store. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Java",
            "Consistent Hashing",
            "Gossip",
            "SSTables"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Key-Value Store logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Key-Value Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "key-value_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "cdn": {
        "title": "Content Delivery Network",
        "overview": "A highly scalable, distributed architecture designed for Content Delivery Network. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "C++",
            "Nginx",
            "Anycast",
            "Redis",
            "Edge Computing"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Content Delivery Network logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Content Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "content_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "pastebin": {
        "title": "Pastebin System",
        "overview": "Pastebin System requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Node.js",
            "S3",
            "MongoDB",
            "Redis",
            "Hash"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Pastebin System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Pastebin Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "yelp": {
        "title": "Proximity Service (Yelp)",
        "overview": "The Proximity Service (Yelp) is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes.",
        "architecture": "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage.",
        "database_desc": "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters.",
        "security": "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse.",
        "monitoring": "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests.",
        "techStack": [
            "Python",
            "Elasticsearch",
            "PostgreSQL",
            "Redis",
            "Geohash"
        ],
        "isExternal": false,
        "category": "geospatial",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "map-pin",
                    "title": "Location Tracking",
                    "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."
                },
                {
                    "icon": "navigation",
                    "title": "Proximity Matching",
                    "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."
                },
                {
                    "icon": "git-merge",
                    "title": "Routing & Dispatch",
                    "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."
                },
                {
                    "icon": "smartphone",
                    "title": "Persistent Connections",
                    "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "location",
                    "title": "Location Ingestion Service",
                    "icon": "crosshair",
                    "details": "Massive Write Volume \u00b7 UDP/WebSockets",
                    "responsibilities": [
                        "Ingests 5-second interval GPS pings",
                        "Updates Spatial indices (QuadTree/Geohash)",
                        "Publishes location streams to event bus"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/ws/location/stream"
                        }
                    ],
                    "db": "PostGIS / Cassandra",
                    "cache": "Redis Geospatial (Current Pos)"
                },
                {
                    "id": "matching",
                    "title": "Matching & Dispatch Engine",
                    "icon": "zap",
                    "details": "Algorithmic \u00b7 Low Latency",
                    "responsibilities": [
                        "Queries nearby entities via spatial radius search",
                        "Calculates ETAs via routing graph",
                        "Creates optimized pairings and locks state"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/dispatch/request"
                        }
                    ],
                    "db": "Graph DB (Routing)",
                    "cache": "Redis (State Locks)"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "locations",
                    "title": "active_locations (Redis / PostGIS)",
                    "cols": "4 cols",
                    "index": "Geohash Index",
                    "columns": [
                        {
                            "name": "entity_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "lat",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "lng",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "geohash",
                            "type": "VARCHAR",
                            "notes": "For fast proximity bounding box"
                        }
                    ]
                }
            ]
        }
    },
    "leaderboard": {
        "title": "Gaming Leaderboard",
        "overview": "Gaming Leaderboard requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Node.js",
            "Redis Sorted Sets",
            "WebSockets",
            "DynamoDB"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Gaming Leaderboard logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Gaming Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "payment-gateway": {
        "title": "Payment Gateway (Stripe)",
        "overview": "Payment Gateway (Stripe) requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Java",
            "PostgreSQL",
            "Kafka",
            "Redis",
            "PCI-DSS"
        ],
        "isExternal": false,
        "category": "ecommerce",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "shopping-cart",
                    "title": "Catalog & Search",
                    "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."
                },
                {
                    "icon": "database",
                    "title": "Inventory Management",
                    "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."
                },
                {
                    "icon": "credit-card",
                    "title": "Payments Integration",
                    "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."
                },
                {
                    "icon": "truck",
                    "title": "Order Fulfillment",
                    "desc": "State machine tracking order lifecycle from cart \u2192 warehouse \u2192 delivery."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Payment Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "stock-exchange": {
        "title": "Stock Trading System",
        "overview": "Stock Trading System requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "C++",
            "In-Memory DB",
            "UDP",
            "Disruptor"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Stock Trading System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Stock Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "metrics-system": {
        "title": "Metrics Monitoring",
        "overview": "A highly scalable, distributed architecture designed for Metrics Monitoring. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Go",
            "Time-Series DB",
            "Kafka",
            "Redis",
            "InfluxDB"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Metrics Monitoring logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Metrics Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "metrics_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "ad-click": {
        "title": "Ad Click Aggregator",
        "overview": "A highly scalable, distributed architecture designed for Ad Click Aggregator. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Java",
            "Hadoop",
            "Druid",
            "Kafka",
            "MapReduce"
        ],
        "isExternal": false,
        "category": "data",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Ad Click Aggregator logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Ad Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "ad_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "hotel-booking": {
        "title": "Hotel Booking (Airbnb)",
        "overview": "Hotel Booking (Airbnb) requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Ruby",
            "MySQL",
            "Redis",
            "Elasticsearch",
            "Cassandra"
        ],
        "isExternal": false,
        "category": "ecommerce",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "shopping-cart",
                    "title": "Catalog & Search",
                    "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."
                },
                {
                    "icon": "database",
                    "title": "Inventory Management",
                    "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."
                },
                {
                    "icon": "credit-card",
                    "title": "Payments Integration",
                    "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."
                },
                {
                    "icon": "truck",
                    "title": "Order Fulfillment",
                    "desc": "State machine tracking order lifecycle from cart \u2192 warehouse \u2192 delivery."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Hotel Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "food-delivery": {
        "title": "Food Delivery (DoorDash)",
        "overview": "The Food Delivery (DoorDash) is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes.",
        "architecture": "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage.",
        "database_desc": "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters.",
        "security": "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse.",
        "monitoring": "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests.",
        "techStack": [
            "Python",
            "PostgreSQL",
            "Kafka",
            "Redis",
            "Elasticsearch"
        ],
        "isExternal": false,
        "category": "geospatial",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "map-pin",
                    "title": "Location Tracking",
                    "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."
                },
                {
                    "icon": "navigation",
                    "title": "Proximity Matching",
                    "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."
                },
                {
                    "icon": "git-merge",
                    "title": "Routing & Dispatch",
                    "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."
                },
                {
                    "icon": "smartphone",
                    "title": "Persistent Connections",
                    "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "location",
                    "title": "Location Ingestion Service",
                    "icon": "crosshair",
                    "details": "Massive Write Volume \u00b7 UDP/WebSockets",
                    "responsibilities": [
                        "Ingests 5-second interval GPS pings",
                        "Updates Spatial indices (QuadTree/Geohash)",
                        "Publishes location streams to event bus"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/ws/location/stream"
                        }
                    ],
                    "db": "PostGIS / Cassandra",
                    "cache": "Redis Geospatial (Current Pos)"
                },
                {
                    "id": "matching",
                    "title": "Matching & Dispatch Engine",
                    "icon": "zap",
                    "details": "Algorithmic \u00b7 Low Latency",
                    "responsibilities": [
                        "Queries nearby entities via spatial radius search",
                        "Calculates ETAs via routing graph",
                        "Creates optimized pairings and locks state"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/dispatch/request"
                        }
                    ],
                    "db": "Graph DB (Routing)",
                    "cache": "Redis (State Locks)"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "locations",
                    "title": "active_locations (Redis / PostGIS)",
                    "cols": "4 cols",
                    "index": "Geohash Index",
                    "columns": [
                        {
                            "name": "entity_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "lat",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "lng",
                            "type": "FLOAT",
                            "notes": ""
                        },
                        {
                            "name": "geohash",
                            "type": "VARCHAR",
                            "notes": "For fast proximity bounding box"
                        }
                    ]
                }
            ]
        }
    },
    "music-streaming": {
        "title": "Music Streaming (Spotify)",
        "overview": "The Music Streaming (Spotify) architecture is a state-of-the-art distributed system optimized for extreme bandwidth requirements and real-time media delivery. It is meticulously designed to handle thousands of concurrent read requests per second while maintaining sub-second buffer times globally. By pushing logic to the edge and employing complex asynchronous transcoding pipelines, the system guarantees 99.99% availability.",
        "architecture": "The request life-cycle begins with DNS resolution routing users to the nearest CDN edge node. Static assets and manifest files are served immediately. For dynamic operations, the API Gateway authenticates the request via stateless JWTs before routing to the microservice mesh. Media ingestion triggers an event-driven workflow via Kafka, where asynchronous transcoders split the media into smaller chunks and HLS/DASH formats before persisting to blob storage.",
        "database_desc": "Media structural metadata and user preferences are mapped to highly-available wide-column stores like Cassandra, ensuring multi-region replication. High-cardinality search data uses Elasticsearch, while raw video blobs are maintained in S3.",
        "security": "Security centers around robust Digital Rights Management (DRM). Media streams are encrypted at rest and in transit via TLS 1.3. Signed URLs with short expiration times prevent hotlinking. API Rate limiters dampen brute-force attacks at the application edge.",
        "monitoring": "Global latency and CDN cache hit ratios are tracked dynamically. The system monitors rebuffering events and player drops via Datadog, utilizing Prometheus for active cluster telemetry.",
        "techStack": [
            "Java",
            "Cassandra",
            "CDN",
            "Kafka",
            "Machine Learning"
        ],
        "isExternal": false,
        "category": "streaming",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "play-circle",
                    "title": "Media Delivery",
                    "desc": "Adaptive bitrate streaming with sub-second buffer times via Edge CDN."
                },
                {
                    "icon": "upload-cloud",
                    "title": "Content Ingestion",
                    "desc": "Asynchronous transcoding pipelines converting media to HLS/DASH formats."
                },
                {
                    "icon": "activity",
                    "title": "Telemetry",
                    "desc": "Real-time tracking of viewing history, buffer rates, and drop-offs."
                },
                {
                    "icon": "shield",
                    "title": "Digital Rights Management",
                    "desc": "DRM encryption integration to protect premium copyrighted media."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "playback",
                    "title": "Playback Authorization API",
                    "icon": "play",
                    "details": "High read volume \u00b7 Edge proximity",
                    "responsibilities": [
                        "Resolves user device to optimal CDN node",
                        "Issues short-lived signed URLs for media chunks",
                        "Validates subscription and concurrent device limits"
                    ],
                    "endpoints": [
                        {
                            "method": "GET",
                            "path": "/api/v1/play/manifest/:id"
                        }
                    ],
                    "db": "Cassandra (View State)",
                    "cache": "Redis (Active Streams)"
                },
                {
                    "id": "transcoding",
                    "title": "Transcoder Worker Pool",
                    "icon": "film",
                    "details": "CPU intensive \u00b7 Asynchronous",
                    "responsibilities": [
                        "Pulls raw media from ingest S3 buckets",
                        "Splits video into adaptive bitrate chunks (1080p, 720p, etc.)",
                        "Pushes processed shards to CDN origins"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal Event Driven (Kafka)"
                        }
                    ],
                    "db": "Amazon S3 (Blobs)",
                    "cache": "Local NVMe Drives"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "media_metadata",
                    "title": "media_metadata (NoSQL)",
                    "cols": "5 cols",
                    "index": "idx_genre",
                    "columns": [
                        {
                            "name": "media_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "title",
                            "type": "VARCHAR",
                            "notes": ""
                        },
                        {
                            "name": "manifest_url",
                            "type": "VARCHAR",
                            "notes": "S3/CDN pointer"
                        },
                        {
                            "name": "duration_sec",
                            "type": "INT",
                            "notes": ""
                        },
                        {
                            "name": "resolutions",
                            "type": "JSONB",
                            "notes": "e.g., [1080, 720, 480]"
                        }
                    ]
                }
            ]
        }
    },
    "email": {
        "title": "Email Service (Gmail)",
        "overview": "Architected for near-instantaneous global state delivery, Email Service (Gmail) operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times.",
        "architecture": "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue.",
        "database_desc": "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp.",
        "security": "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks.",
        "monitoring": "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs.",
        "techStack": [
            "C++",
            "Bigtable",
            "SMTP",
            "Redis",
            "MIME"
        ],
        "isExternal": false,
        "category": "messaging",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "message-square",
                    "title": "Real-time Messaging",
                    "desc": "1-on-1 and group chat delivery with < 100ms latency globally."
                },
                {
                    "icon": "wifi",
                    "title": "Presence Indicators",
                    "desc": "Online/offline status and typing indicators broadcasted efficiently."
                },
                {
                    "icon": "lock",
                    "title": "E2E Encryption",
                    "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."
                },
                {
                    "icon": "server",
                    "title": "Offline Storage",
                    "desc": "Persistent queueing for delivering messages when users come back online."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "gateway",
                    "title": "WebSocket Gateway Cluster",
                    "icon": "plug",
                    "details": "Long-lived connections \u00b7 Stateful routing",
                    "responsibilities": [
                        "Maintains persistent TCP/WS links per active client",
                        "Routes inbound messages to internal bus",
                        "Pushes outbound payload deliveries"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/chat/connect"
                        }
                    ],
                    "db": "N/A",
                    "cache": "Redis (Session mapping: User -> Node)"
                },
                {
                    "id": "message-router",
                    "title": "Message Routing Service",
                    "icon": "mail",
                    "details": "High throughput routing",
                    "responsibilities": [
                        "Determines if recipient is online via Presence service",
                        "Routes payload directly or sends to offline storage",
                        "Manages fan-out for large group chats"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal gRPC / Queues"
                        }
                    ],
                    "db": "Cassandra (Offline/History)",
                    "cache": "Kafka Event Bus"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "messages",
                    "title": "messages (Wide-Column)",
                    "cols": "5 cols",
                    "index": "Clustering Key: timestamp",
                    "columns": [
                        {
                            "name": "chat_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "message_id",
                            "type": "TIMEUUID",
                            "notes": "Clustering Key (Sorted)"
                        },
                        {
                            "name": "sender_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "payload",
                            "type": "BLOB",
                            "notes": "Encrypted cipher text"
                        },
                        {
                            "name": "status",
                            "type": "TINYINT",
                            "notes": "0=Sent, 1=Delivered, 2=Read"
                        }
                    ]
                }
            ]
        }
    },
    "cloud-storage": {
        "title": "Cloud Object Storage",
        "overview": "A highly scalable, distributed architecture designed for Cloud Object Storage. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Java",
            "Erasure Coding",
            "Cassandra",
            "Kafka",
            "Blob"
        ],
        "isExternal": false,
        "category": "storage",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Cloud Object Storage logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Cloud Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "cloud_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "distributed-cache": {
        "title": "Distributed Cache",
        "overview": "A highly scalable, distributed architecture designed for Distributed Cache. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "C",
            "Consistent Hashing",
            "LRU",
            "TCP",
            "Memcached"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Distributed Cache logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Distributed Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "distributed_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "message-queue": {
        "title": "Distributed Message Queue",
        "overview": "A highly scalable, distributed architecture designed for Distributed Message Queue. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Scala",
            "ZooKeeper",
            "Log Append",
            "TCP",
            "Kafka"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Distributed Message Queue logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Distributed Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "distributed_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "fraud-detection": {
        "title": "Fraud Detection System",
        "overview": "A highly scalable, distributed architecture designed for Fraud Detection System. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Python",
            "Spark",
            "GraphDB",
            "Kafka",
            "Machine Learning"
        ],
        "isExternal": false,
        "category": "data",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Fraud Detection System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Fraud Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "fraud_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "notification-system": {
        "title": "Notification Service",
        "overview": "Architected for near-instantaneous global state delivery, Notification Service operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times.",
        "architecture": "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue.",
        "database_desc": "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp.",
        "security": "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks.",
        "monitoring": "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs.",
        "techStack": [
            "Go",
            "RabbitMQ",
            "Redis",
            "MySQL",
            "APNS/FCM"
        ],
        "isExternal": false,
        "category": "messaging",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "message-square",
                    "title": "Real-time Messaging",
                    "desc": "1-on-1 and group chat delivery with < 100ms latency globally."
                },
                {
                    "icon": "wifi",
                    "title": "Presence Indicators",
                    "desc": "Online/offline status and typing indicators broadcasted efficiently."
                },
                {
                    "icon": "lock",
                    "title": "E2E Encryption",
                    "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."
                },
                {
                    "icon": "server",
                    "title": "Offline Storage",
                    "desc": "Persistent queueing for delivering messages when users come back online."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "gateway",
                    "title": "WebSocket Gateway Cluster",
                    "icon": "plug",
                    "details": "Long-lived connections \u00b7 Stateful routing",
                    "responsibilities": [
                        "Maintains persistent TCP/WS links per active client",
                        "Routes inbound messages to internal bus",
                        "Pushes outbound payload deliveries"
                    ],
                    "endpoints": [
                        {
                            "method": "WS",
                            "path": "/chat/connect"
                        }
                    ],
                    "db": "N/A",
                    "cache": "Redis (Session mapping: User -> Node)"
                },
                {
                    "id": "message-router",
                    "title": "Message Routing Service",
                    "icon": "mail",
                    "details": "High throughput routing",
                    "responsibilities": [
                        "Determines if recipient is online via Presence service",
                        "Routes payload directly or sends to offline storage",
                        "Manages fan-out for large group chats"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "Internal gRPC / Queues"
                        }
                    ],
                    "db": "Cassandra (Offline/History)",
                    "cache": "Kafka Event Bus"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "messages",
                    "title": "messages (Wide-Column)",
                    "cols": "5 cols",
                    "index": "Clustering Key: timestamp",
                    "columns": [
                        {
                            "name": "chat_id",
                            "type": "UUID",
                            "notes": "Partition Key"
                        },
                        {
                            "name": "message_id",
                            "type": "TIMEUUID",
                            "notes": "Clustering Key (Sorted)"
                        },
                        {
                            "name": "sender_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "payload",
                            "type": "BLOB",
                            "notes": "Encrypted cipher text"
                        },
                        {
                            "name": "status",
                            "type": "TINYINT",
                            "notes": "0=Sent, 1=Delivered, 2=Read"
                        }
                    ]
                }
            ]
        }
    },
    "news-feed": {
        "title": "News Feed System",
        "overview": "A highly scalable, distributed architecture designed for News Feed System. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "C++",
            "Memcached",
            "MySQL",
            "Redis",
            "Fanout"
        ],
        "isExternal": false,
        "category": "social",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core News Feed System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core News Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "news_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "recommendation": {
        "title": "Recommendation System",
        "overview": "A highly scalable, distributed architecture designed for Recommendation System. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Python",
            "Spark ML",
            "Cassandra",
            "HDFS",
            "Collaborative Filtering"
        ],
        "isExternal": false,
        "category": "data",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Recommendation System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Recommendation Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "recommendation_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "typeahead": {
        "title": "Typeahead Suggestion",
        "overview": "Typeahead Suggestion requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "C++",
            "Trie",
            "Redis",
            "ZooKeeper"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Typeahead Suggestion logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Typeahead Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "job-scheduler": {
        "title": "Distributed Job Scheduler",
        "overview": "A highly scalable, distributed architecture designed for Distributed Job Scheduler. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Java",
            "ZooKeeper",
            "MySQL",
            "Redis",
            "Cron"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Distributed Job Scheduler logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Distributed Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "distributed_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "analytics": {
        "title": "Web Analytics",
        "overview": "A highly scalable, distributed architecture designed for Web Analytics. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Java",
            "Kafka",
            "ClickHouse",
            "Redis",
            "OLAP"
        ],
        "isExternal": false,
        "category": "data",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Web Analytics logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Web Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "web_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "inventory": {
        "title": "Inventory Management",
        "overview": "Inventory Management requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Java",
            "MySQL",
            "Redis",
            "Kafka",
            "ACID"
        ],
        "isExternal": false,
        "category": "ecommerce",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "shopping-cart",
                    "title": "Catalog & Search",
                    "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."
                },
                {
                    "icon": "database",
                    "title": "Inventory Management",
                    "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."
                },
                {
                    "icon": "credit-card",
                    "title": "Payments Integration",
                    "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."
                },
                {
                    "icon": "truck",
                    "title": "Order Fulfillment",
                    "desc": "State machine tracking order lifecycle from cart \u2192 warehouse \u2192 delivery."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Inventory Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "url-threat": {
        "title": "URL Threat Analysis",
        "overview": "A highly scalable, distributed architecture designed for URL Threat Analysis. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Go",
            "Bloom Filter",
            "Cassandra",
            "Redis",
            "Machine Learning"
        ],
        "isExternal": false,
        "category": "security",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core URL Threat Analysis logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core URL Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "url_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "collaborative-doc": {
        "title": "Collaborative Editing",
        "overview": "Collaborative Editing requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "JavaScript",
            "OT / CRDT",
            "Redis",
            "WebSockets"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Collaborative Editing logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Collaborative Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "github": {
        "title": "Code Hosting (GitHub)",
        "overview": "Code Hosting (GitHub) requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory.",
        "architecture": "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks\u2014like email generation, invoice rendering, and inventory reconciliation\u2014are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely.",
        "database_desc": "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs.",
        "security": "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities.",
        "monitoring": "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes.",
        "techStack": [
            "Ruby",
            "Git",
            "MySQL",
            "Redis",
            "Elasticsearch"
        ],
        "isExternal": false,
        "category": "system",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core Code Hosting (GitHub) logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core Code Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "transactions",
                    "title": "transactions (SQL)",
                    "cols": "6 cols",
                    "index": "idx_user_id",
                    "columns": [
                        {
                            "name": "txn_id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "user_id",
                            "type": "UUID",
                            "notes": "FK -> users"
                        },
                        {
                            "name": "amount",
                            "type": "DECIMAL",
                            "notes": ""
                        },
                        {
                            "name": "status",
                            "type": "VARCHAR",
                            "notes": "PENDING, SUCCESS, FAILED"
                        },
                        {
                            "name": "idempotency_key",
                            "type": "VARCHAR",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "ci-cd": {
        "title": "CI/CD Pipeline System",
        "overview": "A highly scalable, distributed architecture designed for CI/CD Pipeline System. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Go",
            "Docker",
            "Kubernetes",
            "Redis",
            "gRPC"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core CI/CD Pipeline System logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core CI/CD Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "ci/cd_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    },
    "graphql-gateway": {
        "title": "GraphQL Federation",
        "overview": "A highly scalable, distributed architecture designed for GraphQL Federation. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance.",
        "architecture": "Client \u2192 CDN Edge \u2192 GSLB/Load Balancer \u2192 API Gateway (Auth & Rate Limit) \u2192 Microservices Mesh \u2192 Cache Layer \u2192 Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka.",
        "database_desc": "Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms.",
        "security": "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters.",
        "monitoring": "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh.",
        "techStack": [
            "Node.js",
            "GraphQL",
            "Redis",
            "Apollo",
            "Schema Registry"
        ],
        "isExternal": false,
        "category": "infrastructure",
        "detail": {
            "reqs": [
                {
                    "icon": "users",
                    "title": "User Management & Auth",
                    "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."
                },
                {
                    "icon": "cpu",
                    "title": "High Throughput Core",
                    "desc": "Optimized processing engine scaling horizontally to serve the core GraphQL Federation logic."
                },
                {
                    "icon": "zap",
                    "title": "Low Latency Reads",
                    "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."
                },
                {
                    "icon": "shield-alert",
                    "title": "Fault Tolerance",
                    "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."
                },
                {
                    "icon": "bar-chart",
                    "title": "Data Analytics",
                    "desc": "Background ETL pipelines feeding data warehouses for business intelligence."
                }
            ],
            "arch_layers": [
                {
                    "id": "cdn",
                    "title": "CDN & Edge Layer",
                    "icon": "globe",
                    "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.",
                    "tech": [
                        "Route 53",
                        "CloudFront / Cloudflare",
                        "AWS Shield"
                    ]
                },
                {
                    "id": "api",
                    "title": "API Gateway & Load Balancer",
                    "icon": "git-merge",
                    "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.",
                    "tech": [
                        "Kong / Nginx",
                        "AWS ALB",
                        "Token Bucket Limiters"
                    ]
                },
                {
                    "id": "app",
                    "title": "Stateless Microservices Mesh",
                    "icon": "layers",
                    "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.",
                    "tech": [
                        "Kubernetes (EKS/GKE)",
                        "Docker",
                        "gRPC"
                    ]
                },
                {
                    "id": "mq",
                    "title": "Event Bus / Message Queue",
                    "icon": "repeat",
                    "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).",
                    "tech": [
                        "Apache Kafka",
                        "RabbitMQ",
                        "ActiveMQ"
                    ]
                },
                {
                    "id": "data",
                    "title": "Data Persistence & Caching",
                    "icon": "database",
                    "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.",
                    "tech": [
                        "Redis Cluster",
                        "PostgreSQL",
                        "NoSQL (Cassandra/Dynamo)"
                    ]
                }
            ],
            "microservices": [
                {
                    "id": "auth-service",
                    "title": "Identity & Auth Service",
                    "icon": "user-check",
                    "details": "Stateless \u00b7 Identity Provider",
                    "responsibilities": [
                        "Manages JWT lifecycle and OAuth tokens",
                        "Handles MFA validation and password reset",
                        "Role and permissions (RBAC) verification"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/login"
                        },
                        {
                            "method": "POST",
                            "path": "/api/v1/auth/refresh"
                        }
                    ],
                    "db": "PostgreSQL (Users)",
                    "cache": "Redis (Token Blacklist)"
                },
                {
                    "id": "core",
                    "title": "Core GraphQL Service",
                    "icon": "cpu",
                    "details": "Primary domain operations",
                    "responsibilities": [
                        "Validates incoming payload semantics",
                        "Mutates core entity states safely",
                        "Triggers downstream async integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "POST",
                            "path": "/api/v1/core/resource"
                        },
                        {
                            "method": "GET",
                            "path": "/api/v1/core/resource/:id"
                        }
                    ],
                    "db": "Primary Spanner/Postgres",
                    "cache": "Redis Cluster"
                },
                {
                    "id": "async",
                    "title": "Asynchronous Worker Nodes",
                    "icon": "settings",
                    "details": "Background processing",
                    "responsibilities": [
                        "Consumes events from Message Queue",
                        "Aggregates metrics for analytics dashboards",
                        "Dispatches webhooks and third-party integrations"
                    ],
                    "endpoints": [
                        {
                            "method": "WORKER",
                            "path": "Listens on Kafka Topics"
                        }
                    ],
                    "db": "ClickHouse (Analytics)",
                    "cache": "N/A"
                }
            ],
            "db_schema": [
                {
                    "id": "users",
                    "title": "users (SQL)",
                    "cols": "5 cols",
                    "index": "idx_email",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "email",
                            "type": "VARCHAR(255)",
                            "notes": "UNIQUE"
                        },
                        {
                            "name": "password_hash",
                            "type": "VARCHAR(255)",
                            "notes": "Bcrypt"
                        },
                        {
                            "name": "role",
                            "type": "VARCHAR(50)",
                            "notes": ""
                        },
                        {
                            "name": "created_at",
                            "type": "TIMESTAMP",
                            "notes": "DEFAULT NOW()"
                        }
                    ]
                },
                {
                    "id": "core_data",
                    "title": "graphql_data",
                    "cols": "4 cols",
                    "index": "idx_entity",
                    "columns": [
                        {
                            "name": "id",
                            "type": "UUID",
                            "notes": "PK"
                        },
                        {
                            "name": "owner_id",
                            "type": "UUID",
                            "notes": ""
                        },
                        {
                            "name": "attributes",
                            "type": "JSONB",
                            "notes": "Flexible schema"
                        },
                        {
                            "name": "updated_at",
                            "type": "TIMESTAMP",
                            "notes": ""
                        }
                    ]
                }
            ]
        }
    }
};
