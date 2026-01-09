export interface GlossaryTerm {
  term: string;
  aliases?: string[];
  shortDef: string;
  fullDef: string;
  category: 'aps' | 'cad' | 'devops' | 'cli';
  related?: string[];
}

export const categories = {
  aps: { label: 'APS', color: 'blue', description: 'Autodesk Platform Services' },
  cad: { label: 'CAD/BIM', color: 'green', description: 'Design & Engineering' },
  devops: { label: 'DevOps', color: 'purple', description: 'CI/CD & Automation' },
  cli: { label: 'CLI', color: 'yellow', description: 'Command Line & Tools' },
} as const;

export const glossary: GlossaryTerm[] = [
  // ============================================
  // APS (Autodesk Platform Services) - ~20 terms
  // ============================================
  {
    term: 'APS',
    aliases: ['Autodesk Platform Services'],
    shortDef: 'Autodesk Platform Services - cloud APIs for CAD/BIM automation.',
    fullDef: 'Autodesk Platform Services (formerly Forge) is a collection of cloud-based APIs that enable developers to build applications integrating with Autodesk products. It includes services for authentication, file storage, model translation, data management, and more.',
    category: 'aps',
    related: ['Forge', 'OAuth', 'OSS'],
  },
  {
    term: 'Forge',
    shortDef: 'Legacy name for Autodesk Platform Services (APS).',
    fullDef: 'Forge was the original branding for Autodesk\'s cloud platform APIs, rebranded to Autodesk Platform Services (APS) in 2022. Many older documentation, tutorials, and code samples still reference Forge.',
    category: 'aps',
    related: ['APS'],
  },
  {
    term: 'OAuth',
    aliases: ['OAuth 2.0'],
    shortDef: 'Industry-standard authorization protocol used by APS.',
    fullDef: 'OAuth 2.0 is the authorization framework used by APS to grant applications access to user data without sharing passwords. APS supports multiple OAuth flows including 2-legged (client credentials) and 3-legged (authorization code) authentication.',
    category: 'aps',
    related: ['2-legged auth', '3-legged auth', 'Token'],
  },
  {
    term: '2-legged auth',
    aliases: ['2-legged OAuth', 'client credentials', 'two-legged'],
    shortDef: 'Server-to-server authentication without user context.',
    fullDef: '2-legged OAuth (Client Credentials flow) authenticates your application directly with APS without requiring user interaction. Used for server-side operations, CI/CD pipelines, and accessing application-owned resources like OSS buckets.',
    category: 'aps',
    related: ['OAuth', '3-legged auth', 'Token'],
  },
  {
    term: '3-legged auth',
    aliases: ['3-legged OAuth', 'authorization code', 'three-legged'],
    shortDef: 'User-authorized authentication with browser login.',
    fullDef: '3-legged OAuth (Authorization Code flow) requires user interaction to grant your application access to their data. The user logs in via browser, approves permissions, and your app receives tokens to act on their behalf. Required for accessing user-specific data in ACC, BIM 360, and Fusion.',
    category: 'aps',
    related: ['OAuth', '2-legged auth', 'Token'],
  },
  {
    term: 'OSS',
    aliases: ['Object Storage Service'],
    shortDef: 'APS cloud storage for files and models.',
    fullDef: 'Object Storage Service is APS\'s cloud file storage system. Files are organized in buckets and identified by object keys. OSS is commonly used to store source CAD files before translation and to host translated derivatives.',
    category: 'aps',
    related: ['Bucket', 'URN', 'Model Derivative'],
  },
  {
    term: 'Bucket',
    shortDef: 'Container for storing objects in OSS.',
    fullDef: 'A bucket is a named container in Object Storage Service that holds files (objects). Buckets have retention policies (transient, temporary, persistent) that determine how long files are stored. Bucket names must be globally unique across all APS applications.',
    category: 'aps',
    related: ['OSS', 'URN'],
  },
  {
    term: 'URN',
    aliases: ['Uniform Resource Name'],
    shortDef: 'Unique identifier for objects in APS.',
    fullDef: 'A Uniform Resource Name uniquely identifies an object in APS. URNs are base64-encoded strings derived from bucket and object keys. They\'re used extensively in Model Derivative API calls and must be URL-safe encoded when passed as parameters.',
    category: 'aps',
    related: ['OSS', 'Bucket', 'Model Derivative'],
  },
  {
    term: 'Model Derivative',
    aliases: ['Model Derivative API'],
    shortDef: 'APS service for translating and extracting CAD data.',
    fullDef: 'Model Derivative API converts CAD files into viewable formats (SVF/SVF2) and extracts metadata, geometry, and properties. It supports 60+ input formats and can output to formats like OBJ, STL, STEP, and IGES.',
    category: 'aps',
    related: ['Translation Job', 'SVF2', 'Manifest', 'Derivative'],
  },
  {
    term: 'Translation Job',
    aliases: ['translation'],
    shortDef: 'Background process converting CAD files to viewable formats.',
    fullDef: 'A translation job is an asynchronous process that converts source CAD files into derivatives. Jobs are started via the Model Derivative API and progress through states: pending, inprogress, success, or failed. Use manifest endpoint to check status.',
    category: 'aps',
    related: ['Model Derivative', 'Manifest', 'Derivative'],
  },
  {
    term: 'Manifest',
    shortDef: 'Metadata about a translated model and its derivatives.',
    fullDef: 'The manifest describes a translated model\'s structure, available derivatives, and translation status. It lists all generated outputs (viewables, thumbnails, extracted data) and their download URNs. Check the manifest to monitor translation progress.',
    category: 'aps',
    related: ['Model Derivative', 'Translation Job', 'Derivative'],
  },
  {
    term: 'Data Management',
    aliases: ['Data Management API', 'DM'],
    shortDef: 'APS service for accessing files in ACC, BIM 360, and Fusion.',
    fullDef: 'Data Management API provides access to files stored in Autodesk cloud products (ACC, BIM 360, Fusion Team). It exposes a hierarchical structure of hubs, projects, folders, items, and versions. Requires 3-legged authentication.',
    category: 'aps',
    related: ['Hub', 'Project', 'ACC', 'BIM 360'],
  },
  {
    term: 'Hub',
    shortDef: 'Top-level container in Data Management (company/account).',
    fullDef: 'A hub represents a company or account in Autodesk\'s cloud products. BIM 360 and ACC accounts appear as hubs with different hub types. Hubs contain projects, which contain folders and files.',
    category: 'aps',
    related: ['Data Management', 'Project', 'ACC'],
  },
  {
    term: 'Project',
    shortDef: 'Container for folders and files within a hub.',
    fullDef: 'A project is a collection of folders and files within a hub. In ACC/BIM 360, projects correspond to construction or design projects. Projects have their own folder structure, permissions, and settings.',
    category: 'aps',
    related: ['Hub', 'Data Management', 'Folder'],
  },
  {
    term: 'ACC',
    aliases: ['Autodesk Construction Cloud'],
    shortDef: 'Autodesk\'s construction management platform.',
    fullDef: 'Autodesk Construction Cloud is a unified platform for construction project management, including document management, design collaboration, issue tracking, RFIs, submittals, and field management. Successor to BIM 360.',
    category: 'aps',
    related: ['BIM 360', 'Data Management', 'Hub'],
  },
  {
    term: 'BIM 360',
    aliases: ['BIM360'],
    shortDef: 'Legacy Autodesk construction platform (predecessor to ACC).',
    fullDef: 'BIM 360 was Autodesk\'s original cloud-based construction management platform. While largely replaced by ACC, many existing projects and APIs still use BIM 360. Includes Docs, Design, Build, and other modules.',
    category: 'aps',
    related: ['ACC', 'Data Management', 'Hub'],
  },
  {
    term: 'Webhooks',
    aliases: ['Webhook'],
    shortDef: 'Event notifications sent to your application.',
    fullDef: 'Webhooks deliver real-time notifications when events occur in APS services. Instead of polling for changes, your application registers callback URLs to receive HTTP POST requests when files are uploaded, translations complete, or other events happen.',
    category: 'aps',
    related: ['APS'],
  },
  {
    term: 'Design Automation',
    aliases: ['Design Automation API', 'DA'],
    shortDef: 'Run Autodesk desktop apps in the cloud.',
    fullDef: 'Design Automation API executes Autodesk desktop application engines (AutoCAD, Revit, Inventor, 3ds Max) in the cloud without user interaction. Used for batch processing, automated drawing generation, and custom automation workflows.',
    category: 'aps',
    related: ['APS', 'AppBundle', 'Activity'],
  },
  {
    term: 'AppBundle',
    shortDef: 'Custom plugin package for Design Automation.',
    fullDef: 'An AppBundle is a ZIP package containing your custom code (plugin, script, or add-in) that runs within a Design Automation engine. AppBundles are uploaded to APS and referenced by Activities to extend engine capabilities.',
    category: 'aps',
    related: ['Design Automation', 'Activity'],
  },
  {
    term: 'Activity',
    shortDef: 'Design Automation job definition.',
    fullDef: 'An Activity defines what a Design Automation job does: which engine to use, which AppBundles to load, input/output parameters, and execution settings. Work items reference Activities to run actual jobs.',
    category: 'aps',
    related: ['Design Automation', 'AppBundle', 'Work Item'],
  },
  {
    term: 'Work Item',
    shortDef: 'Single execution of a Design Automation Activity.',
    fullDef: 'A Work Item is a request to execute an Activity with specific inputs. It\'s an asynchronous job that processes files through the specified engine and AppBundles, producing outputs that can be downloaded or stored in OSS.',
    category: 'aps',
    related: ['Design Automation', 'Activity'],
  },

  // ============================================
  // CAD/BIM - ~18 terms
  // ============================================
  {
    term: 'CAD',
    aliases: ['Computer-Aided Design'],
    shortDef: 'Software for creating technical drawings and 3D models.',
    fullDef: 'Computer-Aided Design encompasses software tools for creating, modifying, and analyzing designs. CAD software ranges from 2D drafting (AutoCAD) to 3D modeling (Inventor, Fusion) to building design (Revit).',
    category: 'cad',
    related: ['BIM', 'AutoCAD', 'Revit'],
  },
  {
    term: 'BIM',
    aliases: ['Building Information Modeling'],
    shortDef: 'Intelligent 3D model-based design for buildings.',
    fullDef: 'Building Information Modeling is a process using intelligent 3D models for planning, design, construction, and operation of buildings. BIM models contain geometry plus rich metadata about building components, materials, and relationships.',
    category: 'cad',
    related: ['CAD', 'Revit', 'IFC'],
  },
  {
    term: 'Revit',
    aliases: ['Autodesk Revit'],
    shortDef: 'Autodesk\'s BIM software for architecture and construction.',
    fullDef: 'Revit is Autodesk\'s flagship BIM application for architects, engineers, and contractors. It creates parametric 3D models with embedded intelligence about building components. Native file format is RVT.',
    category: 'cad',
    related: ['BIM', 'RVT', 'IFC'],
  },
  {
    term: 'AutoCAD',
    shortDef: 'Industry-standard 2D/3D CAD software.',
    fullDef: 'AutoCAD is Autodesk\'s foundational CAD software for 2D drafting and 3D modeling. Used across industries for technical drawings, documentation, and design. Native file format is DWG.',
    category: 'cad',
    related: ['CAD', 'DWG'],
  },
  {
    term: 'DWG',
    shortDef: 'AutoCAD\'s native file format.',
    fullDef: 'DWG (drawing) is the proprietary binary file format used by AutoCAD and other Autodesk products. It\'s the most widely used CAD file format, containing 2D/3D design data, layers, and metadata.',
    category: 'cad',
    related: ['AutoCAD', 'DXF'],
  },
  {
    term: 'DXF',
    aliases: ['Drawing Exchange Format'],
    shortDef: 'Open CAD exchange format.',
    fullDef: 'Drawing Exchange Format is an open ASCII/binary format for CAD data interchange. Created by Autodesk as a DWG alternative for sharing drawings between different CAD applications.',
    category: 'cad',
    related: ['DWG', 'AutoCAD'],
  },
  {
    term: 'RVT',
    shortDef: 'Revit\'s native file format.',
    fullDef: 'RVT is Revit\'s proprietary file format containing the complete BIM model: 3D geometry, 2D views, schedules, and all embedded building data. RVT files can be quite large due to their comprehensive data.',
    category: 'cad',
    related: ['Revit', 'BIM', 'RFA'],
  },
  {
    term: 'RFA',
    aliases: ['Revit Family'],
    shortDef: 'Revit component library file.',
    fullDef: 'RFA (Revit Family) files contain reusable building components like doors, windows, furniture, and equipment. Families define parametric geometry and behavior that can be placed multiple times in projects.',
    category: 'cad',
    related: ['Revit', 'RVT'],
  },
  {
    term: 'NWD',
    aliases: ['Navisworks Document'],
    shortDef: 'Navisworks review file format.',
    fullDef: 'NWD is a published Navisworks file format for sharing models for review. It contains flattened geometry from various source formats, making it ideal for coordination and clash detection without exposing original CAD data.',
    category: 'cad',
    related: ['NWC', 'Navisworks'],
  },
  {
    term: 'IFC',
    aliases: ['Industry Foundation Classes'],
    shortDef: 'Open standard for BIM data exchange.',
    fullDef: 'Industry Foundation Classes is an ISO standard (ISO 16739) for open BIM data exchange. IFC enables interoperability between different BIM software by defining a common schema for building elements and properties.',
    category: 'cad',
    related: ['BIM', 'Revit', 'openBIM'],
  },
  {
    term: 'STEP',
    aliases: ['STP', 'ISO 10303'],
    shortDef: 'ISO standard for 3D CAD data exchange.',
    fullDef: 'STEP (Standard for the Exchange of Product Data) is an ISO standard (ISO 10303) for representing 3D CAD models. Widely used in manufacturing for exchanging geometry between different CAD systems.',
    category: 'cad',
    related: ['IGES', 'OBJ'],
  },
  {
    term: 'IGES',
    aliases: ['IGS'],
    shortDef: 'Legacy neutral CAD exchange format.',
    fullDef: 'Initial Graphics Exchange Specification is an older vendor-neutral format for CAD data exchange. While largely superseded by STEP, IGES is still used for compatibility with legacy systems.',
    category: 'cad',
    related: ['STEP', 'DXF'],
  },
  {
    term: 'OBJ',
    aliases: ['Wavefront OBJ'],
    shortDef: 'Simple 3D geometry format.',
    fullDef: 'OBJ is a simple, widely-supported 3D geometry format storing vertices, faces, and texture coordinates. Common for 3D printing, game development, and web visualization. Does not preserve CAD-specific data.',
    category: 'cad',
    related: ['STL', 'FBX'],
  },
  {
    term: 'STL',
    aliases: ['Stereolithography'],
    shortDef: '3D printing mesh format.',
    fullDef: 'STL (Stereolithography) is a file format describing surface geometry as triangular meshes. Standard format for 3D printing and rapid prototyping. Does not include color, texture, or material information.',
    category: 'cad',
    related: ['OBJ', '3D Printing'],
  },
  {
    term: 'FBX',
    shortDef: 'Autodesk\'s 3D animation exchange format.',
    fullDef: 'FBX is Autodesk\'s format for 3D content exchange, supporting geometry, materials, textures, animations, and rigging. Widely used in game development and visual effects pipelines.',
    category: 'cad',
    related: ['OBJ', '3ds Max', 'Maya'],
  },
  {
    term: 'SVF',
    aliases: ['Simple Vector Format'],
    shortDef: 'Legacy APS viewing format.',
    fullDef: 'Simple Vector Format was APS\'s original output format for web viewing. Contains optimized geometry, materials, and metadata for browser-based rendering. Superseded by SVF2.',
    category: 'cad',
    related: ['SVF2', 'Model Derivative', 'Viewable'],
  },
  {
    term: 'SVF2',
    shortDef: 'Current APS viewing format (improved performance).',
    fullDef: 'SVF2 is the current-generation viewing format for APS, offering improved loading performance, smaller file sizes, and better rendering quality than SVF. Recommended for all new translations.',
    category: 'cad',
    related: ['SVF', 'Model Derivative', 'Viewable'],
  },
  {
    term: 'Viewable',
    shortDef: 'Translated model output for web viewing.',
    fullDef: 'A viewable is a Model Derivative output optimized for display in the Autodesk Viewer. Viewables include geometry, materials, and metadata in formats (SVF/SVF2) that browsers can render efficiently.',
    category: 'cad',
    related: ['SVF2', 'Model Derivative', 'Derivative'],
  },
  {
    term: 'Derivative',
    shortDef: 'Any output generated from model translation.',
    fullDef: 'A derivative is any file generated by the Model Derivative API from a source model. This includes viewables (SVF2), geometry exports (OBJ, STL), metadata extracts, and thumbnails.',
    category: 'cad',
    related: ['Model Derivative', 'Viewable', 'Manifest'],
  },

  // ============================================
  // DevOps/CI-CD - ~12 terms
  // ============================================
  {
    term: 'CI/CD',
    aliases: ['CI', 'CD', 'Continuous Integration', 'Continuous Delivery'],
    shortDef: 'Automated build, test, and deployment pipelines.',
    fullDef: 'Continuous Integration/Continuous Delivery automates software building, testing, and deployment. CI merges code changes frequently with automated tests; CD automatically deploys validated changes. RAPS enables CI/CD for CAD workflows.',
    category: 'devops',
    related: ['Pipeline', 'GitHub Actions', 'Automation'],
  },
  {
    term: 'Pipeline',
    aliases: ['CI Pipeline', 'Build Pipeline'],
    shortDef: 'Automated sequence of build/test/deploy steps.',
    fullDef: 'A pipeline is an automated workflow that processes code or data through defined stages. In CI/CD, pipelines typically include build, test, and deploy stages. RAPS integrates into pipelines to automate APS operations.',
    category: 'devops',
    related: ['CI/CD', 'GitHub Actions', 'Workflow'],
  },
  {
    term: 'GitHub Actions',
    aliases: ['GHA'],
    shortDef: 'GitHub\'s built-in CI/CD platform.',
    fullDef: 'GitHub Actions is GitHub\'s automation platform for CI/CD workflows. Workflows are defined in YAML files and triggered by events (push, PR, schedule). RAPS provides a GitHub Action for easy integration.',
    category: 'devops',
    related: ['CI/CD', 'Pipeline', 'Workflow'],
  },
  {
    term: 'Workflow',
    shortDef: 'Automated process triggered by events.',
    fullDef: 'A workflow is an automated process defined in a configuration file (e.g., GitHub Actions YAML). Workflows specify triggers, jobs, steps, and environments for automated tasks.',
    category: 'devops',
    related: ['Pipeline', 'GitHub Actions'],
  },
  {
    term: 'Environment Variable',
    aliases: ['env var', 'ENV'],
    shortDef: 'Configuration value passed to applications.',
    fullDef: 'Environment variables are key-value pairs that configure application behavior without hardcoding values. RAPS uses env vars (APS_CLIENT_ID, APS_CLIENT_SECRET) for secure credential management in CI/CD.',
    category: 'devops',
    related: ['Secret', 'Configuration'],
  },
  {
    term: 'Secret',
    aliases: ['CI Secret', 'Repository Secret'],
    shortDef: 'Encrypted sensitive configuration value.',
    fullDef: 'Secrets are encrypted environment variables for sensitive data like API keys and passwords. CI/CD platforms store secrets securely and inject them at runtime without exposing values in logs.',
    category: 'devops',
    related: ['Environment Variable', 'Token'],
  },
  {
    term: 'Token',
    aliases: ['Access Token', 'Bearer Token'],
    shortDef: 'Credential for API authentication.',
    fullDef: 'An access token is a credential issued after authentication that grants API access. APS tokens are JWTs with encoded scopes and expiration. RAPS handles token acquisition, refresh, and secure storage.',
    category: 'devops',
    related: ['OAuth', 'Secret', '2-legged auth'],
  },
  {
    term: 'Exit Code',
    aliases: ['Return Code', 'Exit Status'],
    shortDef: 'Numeric status returned when a command completes.',
    fullDef: 'Exit codes indicate command success (0) or failure (non-zero). RAPS uses standardized exit codes for CI/CD integration: 0=success, 1=general error, 2=auth failure, etc. Pipelines use exit codes to control flow.',
    category: 'devops',
    related: ['CLI', 'Pipeline'],
  },
  {
    term: 'Artifact',
    aliases: ['Build Artifact'],
    shortDef: 'Output file produced by a build/pipeline.',
    fullDef: 'An artifact is a file produced during a pipeline run, such as compiled binaries, translated models, or reports. CI/CD platforms can store, share, and deploy artifacts between jobs and workflows.',
    category: 'devops',
    related: ['Pipeline', 'CI/CD'],
  },
  {
    term: 'Docker',
    aliases: ['Docker Container'],
    shortDef: 'Container platform for consistent environments.',
    fullDef: 'Docker packages applications with their dependencies into containers that run consistently anywhere. RAPS provides official Docker images for containerized deployments and CI/CD environments.',
    category: 'devops',
    related: ['Container', 'CI/CD'],
  },
  {
    term: 'Container',
    shortDef: 'Isolated, portable application environment.',
    fullDef: 'A container is a lightweight, standalone package containing code and dependencies. Containers provide consistent environments across development, testing, and production. RAPS runs in Docker containers.',
    category: 'devops',
    related: ['Docker', 'CI/CD'],
  },
  {
    term: 'Automation',
    shortDef: 'Replacing manual processes with software.',
    fullDef: 'Automation eliminates repetitive manual tasks through software. RAPS automates APS operations (uploads, translations, queries) that would otherwise require clicking through web interfaces.',
    category: 'devops',
    related: ['CI/CD', 'Pipeline', 'CLI'],
  },

  // ============================================
  // CLI/General - ~12 terms
  // ============================================
  {
    term: 'CLI',
    aliases: ['Command Line Interface', 'Command-Line'],
    shortDef: 'Text-based interface for running commands.',
    fullDef: 'A Command Line Interface accepts text commands for program interaction. CLIs are essential for automation, scripting, and CI/CD integration. RAPS is a CLI tool for APS.',
    category: 'cli',
    related: ['RAPS', 'Command', 'Terminal'],
  },
  {
    term: 'RAPS',
    aliases: ['raps'],
    shortDef: 'Rust CLI for Autodesk Platform Services.',
    fullDef: 'RAPS (Rust APS CLI) is a command-line tool for interacting with Autodesk Platform Services. It provides commands for authentication, file storage, model translation, and data management, optimized for CI/CD pipelines.',
    category: 'cli',
    related: ['CLI', 'APS', 'MCP'],
  },
  {
    term: 'MCP',
    aliases: ['Model Context Protocol'],
    shortDef: 'Protocol for AI assistant tool integration.',
    fullDef: 'Model Context Protocol is a standard for connecting AI assistants to external tools. RAPS includes an MCP server that exposes APS operations to AI assistants like Claude, enabling natural language interaction with APS.',
    category: 'cli',
    related: ['RAPS', 'AI'],
  },
  {
    term: 'Command',
    aliases: ['Subcommand'],
    shortDef: 'Instruction executed by a CLI tool.',
    fullDef: 'A command is an instruction given to a CLI tool. RAPS commands are organized hierarchically: `raps bucket list`, `raps auth test`, etc. Commands accept flags and arguments to customize behavior.',
    category: 'cli',
    related: ['CLI', 'Flag', 'Argument'],
  },
  {
    term: 'Flag',
    aliases: ['Option', 'Switch'],
    shortDef: 'Optional parameter modifying command behavior.',
    fullDef: 'A flag is a command-line option that modifies command behavior. Flags start with dashes: `-o json` (short) or `--output json` (long). Boolean flags toggle features: `--verbose`, `--quiet`.',
    category: 'cli',
    related: ['Command', 'Argument'],
  },
  {
    term: 'Argument',
    aliases: ['Positional Argument'],
    shortDef: 'Required input value for a command.',
    fullDef: 'An argument is a value passed to a command, typically required for the command to execute. Unlike flags, arguments don\'t have names: `raps bucket delete my-bucket` (my-bucket is the argument).',
    category: 'cli',
    related: ['Command', 'Flag'],
  },
  {
    term: 'Profile',
    aliases: ['Config Profile'],
    shortDef: 'Named set of configuration settings.',
    fullDef: 'A profile is a named configuration set containing credentials and settings. RAPS supports multiple profiles for different APS applications or environments: `raps --profile production auth test`.',
    category: 'cli',
    related: ['Configuration', 'Environment Variable'],
  },
  {
    term: 'Configuration',
    aliases: ['Config'],
    shortDef: 'Settings controlling application behavior.',
    fullDef: 'Configuration includes settings like credentials, defaults, and preferences. RAPS reads configuration from environment variables, config files, and command-line flags (in order of precedence).',
    category: 'cli',
    related: ['Profile', 'Environment Variable'],
  },
  {
    term: 'Keychain',
    aliases: ['Keyring', 'Credential Store'],
    shortDef: 'Secure OS storage for credentials.',
    fullDef: 'The keychain is the operating system\'s secure credential storage (macOS Keychain, Windows Credential Manager, Linux Secret Service). RAPS stores OAuth tokens in the keychain rather than plain text files.',
    category: 'cli',
    related: ['Token', 'Secret'],
  },
  {
    term: 'JSON',
    aliases: ['JavaScript Object Notation'],
    shortDef: 'Standard data interchange format.',
    fullDef: 'JSON (JavaScript Object Notation) is a lightweight data format used for API responses and configuration. RAPS can output results in JSON format (`--output json`) for easy parsing in scripts.',
    category: 'cli',
    related: ['YAML', 'CSV'],
  },
  {
    term: 'YAML',
    aliases: ['YAML Ain\'t Markup Language'],
    shortDef: 'Human-readable configuration format.',
    fullDef: 'YAML is a human-readable data format commonly used for configuration files. GitHub Actions workflows use YAML. RAPS can output results in YAML format (`--output yaml`).',
    category: 'cli',
    related: ['JSON', 'Configuration'],
  },
  {
    term: 'CSV',
    aliases: ['Comma-Separated Values'],
    shortDef: 'Tabular data format for spreadsheets.',
    fullDef: 'CSV is a simple format for tabular data, easily imported into spreadsheets and databases. RAPS can output results in CSV format (`--output csv`) for reporting and analysis.',
    category: 'cli',
    related: ['JSON', 'YAML'],
  },
  {
    term: 'Terminal',
    aliases: ['Console', 'Shell'],
    shortDef: 'Application for running command-line programs.',
    fullDef: 'A terminal is an application that provides access to the command line. Examples include macOS Terminal, Windows Terminal, and iTerm2. RAPS\'s interactive shell runs within a terminal.',
    category: 'cli',
    related: ['CLI', 'Command'],
  },
  {
    term: 'Interactive Shell',
    aliases: ['REPL'],
    shortDef: 'RAPS mode for executing commands interactively.',
    fullDef: 'RAPS\'s interactive shell provides a REPL (Read-Eval-Print Loop) for executing commands without retyping `raps` each time. Features include tab completion, command history, and parameter hints.',
    category: 'cli',
    related: ['CLI', 'RAPS', 'Terminal'],
  },
];

// Helper to get term by name or alias
export function findTerm(search: string): GlossaryTerm | undefined {
  const lower = search.toLowerCase();
  return glossary.find(
    (t) =>
      t.term.toLowerCase() === lower ||
      t.aliases?.some((a) => a.toLowerCase() === lower)
  );
}

// Get all terms sorted alphabetically
export function getSortedTerms(): GlossaryTerm[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term));
}

// Get terms by category
export function getTermsByCategory(category: GlossaryTerm['category']): GlossaryTerm[] {
  return glossary.filter((t) => t.category === category);
}

// Get all unique first letters for alphabetical navigation
export function getAlphabeticalIndex(): string[] {
  const letters = new Set(glossary.map((t) => t.term[0].toUpperCase()));
  return Array.from(letters).sort();
}
