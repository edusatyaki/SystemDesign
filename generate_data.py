import json
import random

topics = [
    ("exam-portal", "Online Exam Portal", ["React.js", "Kubernetes", "PostgreSQL", "Redis", "WebRTC", "AI"], "educational"),
    ("url-shortener", "URL Shortener (Bitly)", ["Node.js", "Redis", "Cassandra", "Nginx", "KGS"], "infrastructure"),
    ("rate-limiter", "API Rate Limiter", ["Go", "Redis", "API Gateway", "Lua", "Token Bucket"], "infrastructure"),
    ("unique-id-generator", "Distributed Unique ID Generator", ["Scala", "ZooKeeper", "Snowflake", "NTP"], "infrastructure"),
    ("ticket-booking", "Ticket Booking (BookMyShow)", ["Node.js", "Redis", "MySQL", "Kafka", "Elasticsearch"], "ecommerce"),
    ("parking-lot", "Parking Lot System", ["Java", "SQL", "Redis", "Spring Boot", "IoT"], "system"),
    ("uber", "Ride Sharing App (Uber)", ["Go", "Kafka", "PostGIS", "Cassandra", "WebSockets"], "geospatial"),
    ("whatsapp", "Chat App (WhatsApp)", ["Erlang", "WebSockets", "Cassandra", "Redis", "Signal Protocol"], "messaging"),
    ("netflix", "Video Streaming (Netflix)", ["Python", "CDN", "Cassandra", "Kafka", "HLS", "Blob Storage"], "streaming"),
    ("twitter", "Twitter Architecture", ["Scala", "Redis", "GraphDB", "Memcached", "Fan-out"], "social"),
    ("instagram", "Photo Sharing (Instagram)", ["Python", "CDN", "PostgreSQL", "Redis", "S3"], "social"),
    ("dropbox", "File Storage & Sync (Dropbox)", ["C++", "S3", "MySQL", "Kafka", "Block Storage"], "storage"),
    ("tinder", "Location Matchmaking (Tinder)", ["Node.js", "Elasticsearch", "Redis", "Kafka", "Geospatial"], "geospatial"),
    ("amazon", "E-commerce (Amazon)", ["Java", "DynamoDB", "Kafka", "Elasticsearch", "Microservices"], "ecommerce"),
    ("youtube", "Video Sharing (YouTube)", ["C++", "Bigtable", "CDN", "Python", "Transcoding"], "streaming"),
    ("google-maps", "Navigation (Google Maps)", ["C++", "Graph-DB", "Redis", "Kafka", "QuadTree"], "geospatial"),
    ("zoom", "Video Conferencing (Zoom)", ["C++", "WebRTC", "Redis", "WebSockets", "UDP"], "streaming"),
    ("slack", "Team Collaboration (Slack)", ["Electron", "WebSockets", "MySQL", "Redis", "Solr"], "messaging"),
    ("discord", "Voice Chat (Discord)", ["Elixir", "Cassandra", "WebRTC", "Redis", "Erlang VM"], "messaging"),
    ("web-crawler", "Distributed Web Crawler", ["Python", "Kafka", "Redis", "Cassandra", "BFS"], "infrastructure"),
    ("search-engine", "Search Engine", ["C++", "Bigtable", "MapReduce", "Redis", "Inverted Index"], "infrastructure"),
    ("key-value-store", "Key-Value Store", ["Java", "Consistent Hashing", "Gossip", "SSTables"], "infrastructure"),
    ("cdn", "Content Delivery Network", ["C++", "Nginx", "Anycast", "Redis", "Edge Computing"], "infrastructure"),
    ("pastebin", "Pastebin System", ["Node.js", "S3", "MongoDB", "Redis", "Hash"], "system"),
    ("yelp", "Proximity Service (Yelp)", ["Python", "Elasticsearch", "PostgreSQL", "Redis", "Geohash"], "geospatial"),
    ("leaderboard", "Gaming Leaderboard", ["Node.js", "Redis Sorted Sets", "WebSockets", "DynamoDB"], "system"),
    ("payment-gateway", "Payment Gateway (Stripe)", ["Java", "PostgreSQL", "Kafka", "Redis", "PCI-DSS"], "ecommerce"),
    ("stock-exchange", "Stock Trading System", ["C++", "In-Memory DB", "UDP", "Disruptor"], "system"),
    ("metrics-system", "Metrics Monitoring", ["Go", "Time-Series DB", "Kafka", "Redis", "InfluxDB"], "infrastructure"),
    ("ad-click", "Ad Click Aggregator", ["Java", "Hadoop", "Druid", "Kafka", "MapReduce"], "data"),
    ("hotel-booking", "Hotel Booking (Airbnb)", ["Ruby", "MySQL", "Redis", "Elasticsearch", "Cassandra"], "ecommerce"),
    ("food-delivery", "Food Delivery (DoorDash)", ["Python", "PostgreSQL", "Kafka", "Redis", "Elasticsearch"], "geospatial"),
    ("music-streaming", "Music Streaming (Spotify)", ["Java", "Cassandra", "CDN", "Kafka", "Machine Learning"], "streaming"),
    ("email", "Email Service (Gmail)", ["C++", "Bigtable", "SMTP", "Redis", "MIME"], "messaging"),
    ("cloud-storage", "Cloud Object Storage", ["Java", "Erasure Coding", "Cassandra", "Kafka", "Blob"], "storage"),
    ("distributed-cache", "Distributed Cache", ["C", "Consistent Hashing", "LRU", "TCP", "Memcached"], "infrastructure"),
    ("message-queue", "Distributed Message Queue", ["Scala", "ZooKeeper", "Log Append", "TCP", "Kafka"], "infrastructure"),
    ("fraud-detection", "Fraud Detection System", ["Python", "Spark", "GraphDB", "Kafka", "Machine Learning"], "data"),
    ("notification-system", "Notification Service", ["Go", "RabbitMQ", "Redis", "MySQL", "APNS/FCM"], "messaging"),
    ("news-feed", "News Feed System", ["C++", "Memcached", "MySQL", "Redis", "Fanout"], "social"),
    ("recommendation", "Recommendation System", ["Python", "Spark ML", "Cassandra", "HDFS", "Collaborative Filtering"], "data"),
    ("typeahead", "Typeahead Suggestion", ["C++", "Trie", "Redis", "ZooKeeper"], "system"),
    ("job-scheduler", "Distributed Job Scheduler", ["Java", "ZooKeeper", "MySQL", "Redis", "Cron"], "infrastructure"),
    ("analytics", "Web Analytics", ["Java", "Kafka", "ClickHouse", "Redis", "OLAP"], "data"),
    ("inventory", "Inventory Management", ["Java", "MySQL", "Redis", "Kafka", "ACID"], "ecommerce"),
    ("url-threat", "URL Threat Analysis", ["Go", "Bloom Filter", "Cassandra", "Redis", "Machine Learning"], "security"),
    ("collaborative-doc", "Collaborative Editing", ["JavaScript", "OT / CRDT", "Redis", "WebSockets"], "system"),
    ("github", "Code Hosting (GitHub)", ["Ruby", "Git", "MySQL", "Redis", "Elasticsearch"], "system"),
    ("ci-cd", "CI/CD Pipeline System", ["Go", "Docker", "Kubernetes", "Redis", "gRPC"], "infrastructure"),
    ("graphql-gateway", "GraphQL Federation", ["Node.js", "GraphQL", "Redis", "Apollo", "Schema Registry"], "infrastructure")
]

def get_archetype_data(archetype, title):
    # Requirements
    reqs = []
    reqs.append({"icon": "users", "title": "User Management & Auth", "desc": "Secure registration, login, and RBAC using stateless JWTs and OAuth2."})
    
    if archetype == "streaming":
        reqs.append({"icon": "play-circle", "title": "Media Delivery", "desc": "Adaptive bitrate streaming with sub-second buffer times via Edge CDN."})
        reqs.append({"icon": "upload-cloud", "title": "Content Ingestion", "desc": "Asynchronous transcoding pipelines converting media to HLS/DASH formats."})
        reqs.append({"icon": "activity", "title": "Telemetry", "desc": "Real-time tracking of viewing history, buffer rates, and drop-offs."})
        reqs.append({"icon": "shield", "title": "Digital Rights Management", "desc": "DRM encryption integration to protect premium copyrighted media."})
    elif archetype == "geospatial":
        reqs.append({"icon": "map-pin", "title": "Location Tracking", "desc": "High-frequency ingestion of GPS coordinates with near-zero latency."})
        reqs.append({"icon": "navigation", "title": "Proximity Matching", "desc": "Complex spatial queries (QuadTree/Geohash) to find nearby entities in milliseconds."})
        reqs.append({"icon": "git-merge", "title": "Routing & Dispatch", "desc": "Algorithmic matchmaking optimizing for distance, ETA, and dynamic pricing."})
        reqs.append({"icon": "smartphone", "title": "Persistent Connections", "desc": "Bi-directional WebSocket links for driver/rider real-time state sync."})
    elif archetype == "ecommerce":
        reqs.append({"icon": "shopping-cart", "title": "Catalog & Search", "desc": "Fuzzy, highly-relevant distributed search over millions of SKUs."})
        reqs.append({"icon": "database", "title": "Inventory Management", "desc": "Strict ACID transactions ensuring items cannot be double-booked or oversold."})
        reqs.append({"icon": "credit-card", "title": "Payments Integration", "desc": "Idempotent payment processing pipelines adhering to PCI-DSS standards."})
        reqs.append({"icon": "truck", "title": "Order Fulfillment", "desc": "State machine tracking order lifecycle from cart → warehouse → delivery."})
    elif archetype == "messaging":
        reqs.append({"icon": "message-square", "title": "Real-time Messaging", "desc": "1-on-1 and group chat delivery with < 100ms latency globally."})
        reqs.append({"icon": "wifi", "title": "Presence Indicators", "desc": "Online/offline status and typing indicators broadcasted efficiently."})
        reqs.append({"icon": "lock", "title": "E2E Encryption", "desc": "End-to-End Encryption utilizing the Signal Protocol. Zero knowledge architecture."})
        reqs.append({"icon": "server", "title": "Offline Storage", "desc": "Persistent queueing for delivering messages when users come back online."})
    else:
        reqs.append({"icon": "cpu", "title": "High Throughput Core", "desc": f"Optimized processing engine scaling horizontally to serve the core {title} logic."})
        reqs.append({"icon": "zap", "title": "Low Latency Reads", "desc": "Aggressive caching layers preventing database hotspots during traffic spikes."})
        reqs.append({"icon": "shield-alert", "title": "Fault Tolerance", "desc": "Circuit breakers, rate limiters, and graceful degradation on component failure."})
        reqs.append({"icon": "bar-chart", "title": "Data Analytics", "desc": "Background ETL pipelines feeding data warehouses for business intelligence."})

    # Microservices
    microservices = [
        {
            "id": "auth-service",
            "title": "Identity & Auth Service",
            "icon": "user-check",
            "details": "Stateless · Identity Provider",
            "responsibilities": ["Manages JWT lifecycle and OAuth tokens", "Handles MFA validation and password reset", "Role and permissions (RBAC) verification"],
            "endpoints": [{"method": "POST", "path": "/api/v1/auth/login"}, {"method": "POST", "path": "/api/v1/auth/refresh"}],
            "db": "PostgreSQL (Users)",
            "cache": "Redis (Token Blacklist)"
        }
    ]
    
    if archetype == "streaming":
        microservices.extend([
            {
                "id": "playback",
                "title": "Playback Authorization API",
                "icon": "play",
                "details": "High read volume · Edge proximity",
                "responsibilities": ["Resolves user device to optimal CDN node", "Issues short-lived signed URLs for media chunks", "Validates subscription and concurrent device limits"],
                "endpoints": [{"method": "GET", "path": "/api/v1/play/manifest/:id"}],
                "db": "Cassandra (View State)",
                "cache": "Redis (Active Streams)"
            },
            {
                "id": "transcoding",
                "title": "Transcoder Worker Pool",
                "icon": "film",
                "details": "CPU intensive · Asynchronous",
                "responsibilities": ["Pulls raw media from ingest S3 buckets", "Splits video into adaptive bitrate chunks (1080p, 720p, etc.)", "Pushes processed shards to CDN origins"],
                "endpoints": [{"method": "POST", "path": "Internal Event Driven (Kafka)"}],
                "db": "Amazon S3 (Blobs)",
                "cache": "Local NVMe Drives"
            }
        ])
    elif archetype == "geospatial":
        microservices.extend([
            {
                "id": "location",
                "title": "Location Ingestion Service",
                "icon": "crosshair",
                "details": "Massive Write Volume · UDP/WebSockets",
                "responsibilities": ["Ingests 5-second interval GPS pings", "Updates Spatial indices (QuadTree/Geohash)", "Publishes location streams to event bus"],
                "endpoints": [{"method": "WS", "path": "/ws/location/stream"}],
                "db": "PostGIS / Cassandra",
                "cache": "Redis Geospatial (Current Pos)"
            },
            {
                "id": "matching",
                "title": "Matching & Dispatch Engine",
                "icon": "zap",
                "details": "Algorithmic · Low Latency",
                "responsibilities": ["Queries nearby entities via spatial radius search", "Calculates ETAs via routing graph", "Creates optimized pairings and locks state"],
                "endpoints": [{"method": "POST", "path": "/api/v1/dispatch/request"}],
                "db": "Graph DB (Routing)",
                "cache": "Redis (State Locks)"
            }
        ])
    elif archetype == "messaging":
        microservices.extend([
            {
                "id": "gateway",
                "title": "WebSocket Gateway Cluster",
                "icon": "plug",
                "details": "Long-lived connections · Stateful routing",
                "responsibilities": ["Maintains persistent TCP/WS links per active client", "Routes inbound messages to internal bus", "Pushes outbound payload deliveries"],
                "endpoints": [{"method": "WS", "path": "/chat/connect"}],
                "db": "N/A",
                "cache": "Redis (Session mapping: User -> Node)"
            },
            {
                "id": "message-router",
                "title": "Message Routing Service",
                "icon": "mail",
                "details": "High throughput routing",
                "responsibilities": ["Determines if recipient is online via Presence service", "Routes payload directly or sends to offline storage", "Manages fan-out for large group chats"],
                "endpoints": [{"method": "POST", "path": "Internal gRPC / Queues"}],
                "db": "Cassandra (Offline/History)",
                "cache": "Kafka Event Bus"
            }
        ])
    else:
        microservices.extend([
            {
                "id": "core",
                "title": f"Core {title.split(' ')[0]} Service",
                "icon": "cpu",
                "details": "Primary domain operations",
                "responsibilities": ["Validates incoming payload semantics", "Mutates core entity states safely", "Triggers downstream async integrations"],
                "endpoints": [{"method": "POST", "path": "/api/v1/core/resource"}, {"method": "GET", "path": "/api/v1/core/resource/:id"}],
                "db": "Primary Spanner/Postgres",
                "cache": "Redis Cluster"
            },
            {
                "id": "async",
                "title": "Asynchronous Worker Nodes",
                "icon": "settings",
                "details": "Background processing",
                "responsibilities": ["Consumes events from Message Queue", "Aggregates metrics for analytics dashboards", "Dispatches webhooks and third-party integrations"],
                "endpoints": [{"method": "WORKER", "path": "Listens on Kafka Topics"}],
                "db": "ClickHouse (Analytics)",
                "cache": "N/A"
            }
        ])

    # Database Schema
    db_schema = [
        {
            "id": "users",
            "title": "users (SQL)",
            "cols": "5 cols",
            "index": "idx_email",
            "columns": [
                {"name": "id", "type": "UUID", "notes": "PK"},
                {"name": "email", "type": "VARCHAR(255)", "notes": "UNIQUE"},
                {"name": "password_hash", "type": "VARCHAR(255)", "notes": "Bcrypt"},
                {"name": "role", "type": "VARCHAR(50)", "notes": ""},
                {"name": "created_at", "type": "TIMESTAMP", "notes": "DEFAULT NOW()"}
            ]
        }
    ]
    
    if archetype == "streaming":
         db_schema.append({
            "id": "media_metadata",
            "title": "media_metadata (NoSQL)",
            "cols": "5 cols",
            "index": "idx_genre",
            "columns": [
                {"name": "media_id", "type": "UUID", "notes": "Partition Key"},
                {"name": "title", "type": "VARCHAR", "notes": ""},
                {"name": "manifest_url", "type": "VARCHAR", "notes": "S3/CDN pointer"},
                {"name": "duration_sec", "type": "INT", "notes": ""},
                {"name": "resolutions", "type": "JSONB", "notes": "e.g., [1080, 720, 480]"}
            ]
        })
    elif archetype == "ecommerce" or archetype == "system":
        db_schema.append({
            "id": "transactions",
            "title": "transactions (SQL)",
            "cols": "6 cols",
            "index": "idx_user_id",
            "columns": [
                {"name": "txn_id", "type": "UUID", "notes": "PK"},
                {"name": "user_id", "type": "UUID", "notes": "FK -> users"},
                {"name": "amount", "type": "DECIMAL", "notes": ""},
                {"name": "status", "type": "VARCHAR", "notes": "PENDING, SUCCESS, FAILED"},
                {"name": "idempotency_key", "type": "VARCHAR", "notes": "UNIQUE"},
                {"name": "created_at", "type": "TIMESTAMP", "notes": ""}
            ]
        })
    elif archetype == "geospatial":
        db_schema.append({
            "id": "locations",
            "title": "active_locations (Redis / PostGIS)",
            "cols": "4 cols",
            "index": "Geohash Index",
            "columns": [
                {"name": "entity_id", "type": "UUID", "notes": "PK"},
                {"name": "lat", "type": "FLOAT", "notes": ""},
                {"name": "lng", "type": "FLOAT", "notes": ""},
                {"name": "geohash", "type": "VARCHAR", "notes": "For fast proximity bounding box"}
            ]
        })
    elif archetype == "messaging":
        db_schema.append({
            "id": "messages",
            "title": "messages (Wide-Column)",
            "cols": "5 cols",
            "index": "Clustering Key: timestamp",
            "columns": [
                {"name": "chat_id", "type": "UUID", "notes": "Partition Key"},
                {"name": "message_id", "type": "TIMEUUID", "notes": "Clustering Key (Sorted)"},
                {"name": "sender_id", "type": "UUID", "notes": ""},
                {"name": "payload", "type": "BLOB", "notes": "Encrypted cipher text"},
                {"name": "status", "type": "TINYINT", "notes": "0=Sent, 1=Delivered, 2=Read"}
            ]
        })
    else:
        db_schema.append({
            "id": "core_data",
            "title": f"{title.split(' ')[0].lower()}_data",
            "cols": "4 cols",
            "index": "idx_entity",
            "columns": [
                {"name": "id", "type": "UUID", "notes": "PK"},
                {"name": "owner_id", "type": "UUID", "notes": ""},
                {"name": "attributes", "type": "JSONB", "notes": "Flexible schema"},
                {"name": "updated_at", "type": "TIMESTAMP", "notes": ""}
            ]
        })

    return reqs, microservices, db_schema


data = {}
for id_str, title, tech, arch_type in topics:
    reqs, microservices, db_schema = get_archetype_data(arch_type, title)
    
    # Architecture Layers remain common but highly descriptive
    arch_layers = [
        {"id": "cdn", "title": "CDN & Edge Layer", "icon": "globe", "desc": "Serves static assets, dampens DDoS attacks at the perimeter, and acts as the initial TLS termination point. It drastically lowers latency by delivering content locally.", "tech": ["Route 53", "CloudFront / Cloudflare", "AWS Shield"]},
        {"id": "api", "title": "API Gateway & Load Balancer", "icon": "git-merge", "desc": "L4/L7 routing. Strips JWTs for auth, enforces strict IP rate limiting, and distributes incoming requests evenly across the active microservice mesh in multiple availability zones.", "tech": ["Kong / Nginx", "AWS ALB", "Token Bucket Limiters"]},
        {"id": "app", "title": "Stateless Microservices Mesh", "icon": "layers", "desc": "The application compute layer. Completely stateless containers auto-scaling based on CPU/Memory thresholds. Services communicate internally via gRPC or asynchronous events.", "tech": ["Kubernetes (EKS/GKE)", "Docker", "gRPC"]},
        {"id": "mq", "title": "Event Bus / Message Queue", "icon": "repeat", "desc": "High-throughput asynchronous data pipeline. Decouples fast ingestion paths from slow processing paths (like email sending, analytics aggregation, or video transcoding).", "tech": ["Apache Kafka", "RabbitMQ", "ActiveMQ"]},
        {"id": "data", "title": "Data Persistence & Caching", "icon": "database", "desc": "The stateful layer. Redis acts as a look-aside cache to absorb 90% of read traffic. Databases are split vertically by domain, employing Master-Slave replication for durability.", "tech": ["Redis Cluster", "PostgreSQL", "NoSQL (Cassandra/Dynamo)"]},
    ]

    # Richer unique texts based on archetype and title
    if arch_type == "streaming":
        overview = f"The {title} architecture is a state-of-the-art distributed system optimized for extreme bandwidth requirements and real-time media delivery. It is meticulously designed to handle thousands of concurrent read requests per second while maintaining sub-second buffer times globally. By pushing logic to the edge and employing complex asynchronous transcoding pipelines, the system guarantees 99.99% availability."
        architecture = "The request life-cycle begins with DNS resolution routing users to the nearest CDN edge node. Static assets and manifest files are served immediately. For dynamic operations, the API Gateway authenticates the request via stateless JWTs before routing to the microservice mesh. Media ingestion triggers an event-driven workflow via Kafka, where asynchronous transcoders split the media into smaller chunks and HLS/DASH formats before persisting to blob storage."
        database_desc = "Media structural metadata and user preferences are mapped to highly-available wide-column stores like Cassandra, ensuring multi-region replication. High-cardinality search data uses Elasticsearch, while raw video blobs are maintained in S3."
        security = "Security centers around robust Digital Rights Management (DRM). Media streams are encrypted at rest and in transit via TLS 1.3. Signed URLs with short expiration times prevent hotlinking. API Rate limiters dampen brute-force attacks at the application edge."
        monitoring = "Global latency and CDN cache hit ratios are tracked dynamically. The system monitors rebuffering events and player drops via Datadog, utilizing Prometheus for active cluster telemetry."
    elif arch_type == "ecommerce" or arch_type == "system":
        overview = f"{title} requires an enterprise-grade architecture focusing heavily on data integrity, ACID compliance, and fault tolerance against high-volume transactional spikes. The system decouples slow-running workflows, seamlessly handling heavy seasonal traffic without compromising user experience or overselling inventory."
        architecture = "Traffic flows through a Global Server Load Balancer (GSLB) terminating at the API Gateway. Core transactional traffic hits the microservice mesh powered by Kubernetes. Heavy asynchronous tasks—like email generation, invoice rendering, and inventory reconciliation—are published to an Event Bus (Kafka/RabbitMQ) where background workers process them safely."
        database_desc = "Financial data and inventory rely exclusively on strictly consistent Relational Databases (PostgreSQL/MySQL) leveraging idempotency keys. Redis acts as a look-aside cache to drastically reduce the load on product catalogs."
        security = "Payment Card Industry (PCI-DSS) compliance is strictly enforced. Credit card parsing is offloaded to compliant gateways. OAuth 2.0 and MFA secure user sessions, while strict Role-Based Access Control governs administrative capabilities."
        monitoring = "Grafana visualizes real-time cart abandonment rates, checkout success metrics, and database transaction lock wait times. PagerDuty integration triggers on unexpected latency spikes."
    elif arch_type == "geospatial":
        overview = f"The {title} is an ultra-low latency architecture dependent on complex spatial computations. Designed to track real-time coordinates, match millions of rapidly moving entities, and maintain real-time bi-directional synchronization between nodes."
        architecture = "Entities stream high-frequency GPS ping updates to the location service via WebSockets or UDP. This location data updates in-memory geospatial clusters relying on Geohash or QuadTree indexing. The Matching Engine continually queries this in-memory graph to formulate optimal routing instructions, delegating persistent history logging to slower asynchronous storage."
        database_desc = "Redis Geospatial enables O(log(N)) radius tracking for active entities. Historical trajectory tracking leverages append-optimized NoSQL stores like Cassandra or horizontally sharded PostGIS clusters."
        security = "Tokens are utilized for active socket sessions. Strict spatial rate limiting prevents GPS spoofing. PII location data is heavily anonymized and encrypted before landing in the data warehouse."
        monitoring = "System telemetry continuously watches for WebSocket drop rates, geospatial index query times, and route calculation deviations. Distributed tracing (Jaeger) links asynchronous requests."
    elif arch_type == "messaging":
        overview = f"Architected for near-instantaneous global state delivery, {title} operates primarily over persistent protocols. It focuses on fan-out efficiency, connection persistence, and minimizing packet round-trip times."
        architecture = "Users maintain long-lived WebSocket or TCP connections mapped to specific Gateway Nodes. Redis caches the specific User-to-Node associations. When a message is dispatched, the router queries the presence service. If online, the payload is pushed directly to the recipient's node; if offline, it degrades gracefully to a distributed queue."
        database_desc = "Read-heavy append-only architecture requires a massive wide-column store. Apache Cassandra functions as the immutable ledger for historical messages, partitioned firmly by chat_id and sorted by timestamp."
        security = "End-to-End Encryption (E2EE) using the Signal Protocol ensures that servers act blindly as temporary relays. Transport Security strictly operates on modern TLS protocols and the system prevents metadata leaks."
        monitoring = "Metrics prioritize tracking concurrent open socket counts, message fan-out latency for large groups, and offline queue depth. ELK aggregates distributed connection logs."
    else:
        overview = f"A highly scalable, distributed architecture designed for {title}. Extensively architected to handle millions of concurrent operations with strict guarantees on latency, reliability, consistency, and absolute fault-tolerance."
        architecture = "Client → CDN Edge → GSLB/Load Balancer → API Gateway (Auth & Rate Limit) → Microservices Mesh → Cache Layer → Database Layer. Background data pipelines and offline tasks are safely offloaded to Apache Kafka."
        database_desc = f"Primary state mutates via ACID-compliant Relational DBs, whereas massive unstructured payloads leverage distributed NoSQL databases. Redis cache hierarchies ensure common read lookups conclude under 5ms."
        security = "End-to-End TLS 1.3 encryption secures transit. OAuth2/JWT guarantees Identity. Edge boundaries are secured via strict WAF rules, IP Blacklisting, and smart API rate limiters."
        monitoring = "Prometheus scrapes infrastructure metrics asynchronously. An ELK stack aggregates stdout logs from containers. Datadog APM tracing illuminates request flows across the microservice mesh."
    
    # Give a special override for Exam Portal so it retains its unique flavor
    if id_str == "exam-portal":
        overview = "Highly secure, real-time proctored assessment platform strictly engineered to support 5,000+ concurrent students without a single dropped packet. It boasts absolute zero data loss, sub-second latency, and AI-driven anti-cheat mechanisms."
        
    data[id_str] = {
        "title": title,
        "overview": overview,
        "architecture": architecture,
        "database_desc": database_desc,
        "security": security,
        "monitoring": monitoring,
        "techStack": tech,
        "isExternal": False,
        "category": arch_type,
        "detail": {
            "reqs": reqs,
            "arch_layers": arch_layers,
            "microservices": microservices,
            "db_schema": db_schema
        }
    }

with open("data.js", "w") as f:
    f.write(f"const systemDesigns = {json.dumps(data, indent=4)};\n")
