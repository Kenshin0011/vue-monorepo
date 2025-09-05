import fs from 'fs';
import path from 'path';

const coverageDir = './coverage';
const apps = ['apps/web'];
const packages = ['packages/ui', 'packages/utils'];

// Create coverage directory if it doesn't exist
if (!fs.existsSync(coverageDir)) {
	fs.mkdirSync(coverageDir, { recursive: true });
}

// Function to merge LCOV files
function mergeLcovFiles() {
	const lcovFiles = [];

	// Collect LCOV files from all projects
	for (const app of apps) {
		const lcovPath = path.join(app, 'coverage', 'lcov.info');
		if (fs.existsSync(lcovPath)) {
			lcovFiles.push(fs.readFileSync(lcovPath, 'utf8'));
		}
	}

	for (const pkg of packages) {
		const lcovPath = path.join(pkg, 'coverage', 'lcov.info');
		if (fs.existsSync(lcovPath)) {
			lcovFiles.push(fs.readFileSync(lcovPath, 'utf8'));
		}
	}

	// Merge and write combined LCOV file
	if (lcovFiles.length > 0) {
		const mergedLcov = lcovFiles.join('\n');
		fs.writeFileSync(path.join(coverageDir, 'lcov.info'), mergedLcov);
		console.log('✅ Merged coverage files to coverage/lcov.info');
	}
}

// Function to create a combined coverage summary
function createCoverageSummary() {
	const summaries = [];
	let totalStatements = 0;
	let coveredStatements = 0;
	let totalBranches = 0;
	let coveredBranches = 0;
	let totalFunctions = 0;
	let coveredFunctions = 0;
	let totalLines = 0;
	let coveredLines = 0;

	// Collect coverage data from all projects
	for (const app of apps) {
		const summaryPath = path.join(app, 'coverage', 'coverage-summary.json');
		if (fs.existsSync(summaryPath)) {
			const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
			summaries.push({ name: app, ...summary.total });

			totalStatements += summary.total.statements.total;
			coveredStatements += summary.total.statements.covered;
			totalBranches += summary.total.branches.total;
			coveredBranches += summary.total.branches.covered;
			totalFunctions += summary.total.functions.total;
			coveredFunctions += summary.total.functions.covered;
			totalLines += summary.total.lines.total;
			coveredLines += summary.total.lines.covered;
		}
	}

	for (const pkg of packages) {
		const summaryPath = path.join(pkg, 'coverage', 'coverage-summary.json');
		if (fs.existsSync(summaryPath)) {
			const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
			summaries.push({ name: pkg, ...summary.total });

			totalStatements += summary.total.statements.total;
			coveredStatements += summary.total.statements.covered;
			totalBranches += summary.total.branches.total;
			coveredBranches += summary.total.branches.covered;
			totalFunctions += summary.total.functions.total;
			coveredFunctions += summary.total.functions.covered;
			totalLines += summary.total.lines.total;
			coveredLines += summary.total.lines.covered;
		}
	}

	// Calculate overall percentages
	const overallCoverage = {
		statements: {
			pct:
				totalStatements > 0
					? Math.round((coveredStatements / totalStatements) * 100)
					: 100,
			covered: coveredStatements,
			total: totalStatements,
		},
		branches: {
			pct:
				totalBranches > 0
					? Math.round((coveredBranches / totalBranches) * 100)
					: 100,
			covered: coveredBranches,
			total: totalBranches,
		},
		functions: {
			pct:
				totalFunctions > 0
					? Math.round((coveredFunctions / totalFunctions) * 100)
					: 100,
			covered: coveredFunctions,
			total: totalFunctions,
		},
		lines: {
			pct: totalLines > 0 ? Math.round((coveredLines / totalLines) * 100) : 100,
			covered: coveredLines,
			total: totalLines,
		},
	};

	// Write combined summary in Istanbul format
	const combinedSummary = {
		total: overallCoverage,
	};

	// Add individual file entries from first project as example
	if (summaries.length > 0) {
		const firstProjectPath = path.join(
			apps[0] || packages[0],
			'coverage',
			'coverage-summary.json',
		);
		if (fs.existsSync(firstProjectPath)) {
			const firstProject = JSON.parse(
				fs.readFileSync(firstProjectPath, 'utf8'),
			);
			// Copy all non-total entries
			Object.keys(firstProject).forEach((key) => {
				if (key !== 'total') {
					combinedSummary[key] = firstProject[key];
				}
			});
		}
	}

	fs.writeFileSync(
		path.join(coverageDir, 'coverage-summary.json'),
		JSON.stringify(combinedSummary, null, 2) + '\n',
	);

	// Print summary to console
	console.log('\n📊 Overall Coverage Summary:');
	console.log('==============================');
	console.log(
		`Statements: ${overallCoverage.statements.pct}% (${overallCoverage.statements.covered}/${overallCoverage.statements.total})`,
	);
	console.log(
		`Branches:   ${overallCoverage.branches.pct}% (${overallCoverage.branches.covered}/${overallCoverage.branches.total})`,
	);
	console.log(
		`Functions:  ${overallCoverage.functions.pct}% (${overallCoverage.functions.covered}/${overallCoverage.functions.total})`,
	);
	console.log(
		`Lines:      ${overallCoverage.lines.pct}% (${overallCoverage.lines.covered}/${overallCoverage.lines.total})`,
	);
	console.log('==============================\n');

	return overallCoverage;
}

// Main execution
try {
	mergeLcovFiles();
	const coverage = createCoverageSummary();

	// Set GitHub Actions output for coverage badge
	if (process.env.GITHUB_ACTIONS) {
		console.log(`::set-output name=coverage::${coverage.statements.pct}%`);
		console.log(`::set-output name=statements::${coverage.statements.pct}`);
		console.log(`::set-output name=branches::${coverage.branches.pct}`);
		console.log(`::set-output name=functions::${coverage.functions.pct}`);
		console.log(`::set-output name=lines::${coverage.lines.pct}`);
	}
} catch (error) {
	console.error('❌ Error merging coverage:', error);
	process.exit(1);
}
