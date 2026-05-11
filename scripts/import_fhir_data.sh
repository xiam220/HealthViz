FHIR_URL="http://localhost:8080/fhir"
DATA_DIR="../data/hl7_fhir_r4_output/fhir"

# Upload practitioner information
echo "Uploading practitioner and hospital information"
curl -X POST "$FHIR_URL" -H "Content-Type: application/fhir+json" --data @"$DATA_DIR"/hospitalInformation1777098602123.json
curl -X POST "$FHIR_URL" -H "Content-Type: application/fhir+json" --data @"$DATA_DIR"/practitionerInformation1777098602123.json
echo "HospitalInformation and PractitionerInformation import completed"

for file in $DATA_DIR/*.json; do 
    if [[ "$file" == *hospitalInformation* || "$file" == *practitionerInformation* ]]; then
        continue
    fi


    echo "Uploading $resource_type"
    curl -X POST "$FHIR_URL" -H "Content-Type: application/fhir+json" --data @"$file"
done

echo "Data import completed"