package main

# OPA / Conftest policy — run in CI against Terraform plans.
# Guardrail by default: a public S3 bucket fails the build before it ships.
#
#   conftest test plan.json --policy policies/

deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_s3_bucket_public_access_block"
    not resource.change.after.block_public_acls
    msg := sprintf("S3 bucket '%s' must block public ACLs", [resource.address])
}

deny[msg] {
    resource := input.resource_changes[_]
    resource.type == "aws_s3_bucket"
    resource.change.after.acl == "public-read"
    msg := sprintf("S3 bucket '%s' must not be public-read", [resource.address])
}

# Every resource must carry cost-allocation tags (FinOps by default).
deny[msg] {
    resource := input.resource_changes[_]
    startswith(resource.type, "aws_")
    not resource.change.after.tags.cost_center
    msg := sprintf("Resource '%s' is missing the cost_center tag", [resource.address])
}
