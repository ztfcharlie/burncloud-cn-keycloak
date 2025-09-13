export function partitionPromiseSettledResults() {
    return [
        ([successes, failures], item) => item.status === "rejected"
            ? [
                successes,
                [item.reason, ...failures]
            ]
            : [
                [item.value, ...successes],
                failures
            ],
        [[], []]
    ];
}
//# sourceMappingURL=partitionPromiseSettledResults.js.map