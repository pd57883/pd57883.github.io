<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dawid Puchta (57883) - PTW LAB F</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #fcfcfc; }
        .container { max-width: 1100px; margin: 0 auto; background: #fff; padding: 25px; border: 1px solid #e0e0e0; border-radius: 6px; }
        .converter-grid { display: flex; gap: 20px; margin-bottom: 20px; }
        .column { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        select { width: 100%; padding: 6px; font-size: 14px; border: 1px solid #aaa; border-radius: 4px; }
        textarea, pre { width: 100%; height: 350px; box-sizing: border-box; padding: 10px; border: 1px solid #7a7a7a; font-family: monospace; font-size: 14px; margin: 0; }
        textarea { resize: vertical; }
        pre { background-color: #fff; overflow: auto; white-space: pre-wrap; }
        .btn-container { width: 100%; }
        .btn-submit { width: 100%; padding: 10px; background-color: #eaeaea; border: 1px solid #bbb; font-size: 15px; cursor: pointer; border-radius: 4px; }
        .btn-submit:hover { background-color: #dadada; }
    </style>
</head>
<body>
    <div class="container">
        <form method="POST">
            <div class="converter-grid">
                <div class="column">
                    <select name="input_format" id="input_format">
                        <option value="csv" <?= $inputFormat === 'csv' ? 'selected' : '' ?>>csv</option>
                        <option value="ssv" <?= $inputFormat === 'ssv' ? 'selected' : '' ?>>ssv</option>
                        <option value="tsv" <?= $inputFormat === 'tsv' ? 'selected' : '' ?>>tsv</option>
                        <option value="json" <?= $inputFormat === 'json' ? 'selected' : '' ?>>json</option>
                        <option value="yaml" <?= $inputFormat === 'yaml' ? 'selected' : '' ?>>yml</option>
                    </select>
                    <textarea name="input_data" placeholder="Wprowadź dane wejściowe..."><?= htmlspecialchars($inputData) ?></textarea>
                </div>

                <div class="column">
                    <select name="output_format" id="output_format">
                        <option value="csv" <?= $outputFormat === 'csv' ? 'selected' : '' ?>>csv</option>
                        <option value="ssv" <?= $outputFormat === 'ssv' ? 'selected' : '' ?>>ssv</option>
                        <option value="tsv" <?= $outputFormat === 'tsv' ? 'selected' : '' ?>>tsv</option>
                        <option value="json" <?= $outputFormat === 'json' ? 'selected' : '' ?>>json</option>
                        <option value="yaml" <?= $outputFormat === 'yaml' ? 'selected' : '' ?>>yml</option>
                    </select>
                    <pre><?= htmlspecialchars($outputData) ?></pre>
                </div>
            </div>

            <div class="btn-container">
                <button type="submit" class="btn-submit">Convert</button>
            </div>
        </form>
    </div>
</body>
</html>
